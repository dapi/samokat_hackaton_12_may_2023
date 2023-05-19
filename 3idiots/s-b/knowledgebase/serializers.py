from rest_framework import serializers
from .models import Category, Question, Answer, ChatHistory

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = "__all__"

class QuestionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Question
        fields = [
            "id", "question", "category", "tags", "created_at", "solved"
        ]

class AnswerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Answer
        fields = [
            "id", "created_at", "question", "answer"
        ]

class DocumentationChatSerializer(serializers.ModelSerializer):
    class Meta:
        model = ChatHistory
        fields = ["question"]
        