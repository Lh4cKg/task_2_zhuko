from django.db import models


class Text(models.Model):
    name = models.CharField(verbose_name="Name", max_length=60)


class Sentence(models.Model):
    body = models.CharField(verbose_name="Body", max_length=1000)
    order = models.PositiveIntegerField(verbose_name='Order')
    text = models.ForeignKey(Text, on_delete=models.CASCADE,
                             related_name="sentences")
