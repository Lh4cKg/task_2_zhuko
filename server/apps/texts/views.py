from nltk.corpus import stopwords
from nltk.tokenize import word_tokenize

from rest_framework import viewsets, status
from rest_framework.mixins import ListModelMixin, RetrieveModelMixin
from rest_framework.decorators import action
from rest_framework.response import Response

from server.apps import Text, Sentence
from server.apps import TextSerializer, SentenceSerializer, \
    TextRetrieveSerializer


def get_similarity_number(text_set, test_text_set):
    l1 = list()
    l2 = list()

    rvector = text_set.union(test_text_set)
    for w in rvector:
        if w in text_set:
            l1.append(1)  # create a vector
        else:
            l1.append(0)
        if w in test_text_set:
            l2.append(1)
        else:
            l2.append(0)
    c = 0

    for i in range(len(rvector)):
        c += l1[i] * l2[i]
    cosine = c / float((sum(l1) * sum(l2)) ** 0.5)
    return round(cosine, 2)


class TextViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows text to be viewed or edited.
    """
    queryset = Text.objects.order_by('name')
    serializer_class = TextSerializer
    retrieve_serializer_class = TextRetrieveSerializer
    permission_classes = []

    def get_serializer_class(self):
        if self.action == 'retrieve':
            return self.retrieve_serializer_class
        return super().get_serializer_class()


class SentenceViewSet(ListModelMixin, RetrieveModelMixin,
                      viewsets.GenericViewSet):
    """
    API endpoint that allows sentences to be viewed or edited.
    """
    queryset = Sentence.objects.all().order_by('order')
    serializer_class = SentenceSerializer
    permission_classes = []

    @action(detail=True, methods=['get'])
    def similar(self, request, pk, *args, **kwargs):
        try:
            sentence = Sentence.objects.get(pk=pk)
        except Sentence.DoesNotExist:
            return Response({'message': 'The sentence does not exists.'},
                            status=status.HTTP_404_NOT_FOUND)
        sw = stopwords.words('english')
        text = sentence.body
        text_list = word_tokenize(text)
        text_set = {w for w in text_list if not w in sw}
        other_sentences = Sentence.objects.exclude(text__in=[sentence.text])
        serializer = self.get_serializer(other_sentences, many=True)
        serializer_data = serializer.data
        for item in serializer_data:
            curr_text = item.get('body')
            curr_text_list = word_tokenize(curr_text)
            curr_text_set = {w for w in curr_text_list if not w in sw}
            item['similarity'] = get_similarity_number(text_set, curr_text_set)
        serializer_data = sorted(serializer_data,
                                 key=lambda x: x['similarity'], reverse=True)
        return Response(serializer_data, status=status.HTTP_200_OK)

