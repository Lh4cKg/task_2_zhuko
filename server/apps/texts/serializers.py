import sys

from rest_framework import serializers

from server.apps import Text, Sentence


MAX_TEXT_SIZE = 10 * 1000 * 1000


def sentences_generator(text):
    res = ""
    for ch in text:
        res = f'{res}{ch}'
        if ch == '.':
            yield res
            res = ""
    if res:
        yield res


class TextSerializer(serializers.ModelSerializer):
    text = serializers.CharField(write_only=True)

    class Meta:
        model = Text
        fields = '__all__'

    def validate_text(self, val):
        val_size = sys.getsizeof(val)
        if val_size > MAX_TEXT_SIZE:
            raise serializers.ValidationError("Size exceeds 10 Mb limit.")
        return val

    def create(self, validated_data):
        text = validated_data['text']
        del validated_data['text']
        obj = super().create(validated_data)
        counter = 1
        for sent in sentences_generator(text):
            sent_obj = Sentence(body=sent, text=obj, order=counter)
            sent_obj.save()
            counter += 1
        return obj


class TextRetrieveSerializer(serializers.ModelSerializer):
    text = serializers.CharField(write_only=True)
    sentences = serializers.SerializerMethodField()

    class Meta:
        model = Text
        fields = '__all__'

    def get_sentences(self, obj):
        queryset = obj.sentences.all()
        if not queryset:
            return list()
        return SentenceSerializer(queryset, many=True).data


class SentenceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Sentence
        fields = '__all__'
