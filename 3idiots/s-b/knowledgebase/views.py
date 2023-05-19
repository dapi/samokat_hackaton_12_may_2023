from django.shortcuts import render
from .models import Category, Question, Answer
from .serializers import CategorySerializer, QuestionSerializer, AnswerSerializer
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework.authentication import SessionAuthentication, TokenAuthentication
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import viewsets
from django.shortcuts import get_object_or_404
from django.db.models import Q 
# Create your views here.

class CategoryViewSet(viewsets.ModelViewSet):
    serializer_class = CategorySerializer
    permission_classes = [IsAuthenticated]
    authentication_classes = (TokenAuthentication, SessionAuthentication)

    def category_details(self, r):
        queryset = Category.objects.all()
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)

    def update(self, request, id=None):
        if id == None:
            id = request.data.get('id')
        queryset = Category.objects.filter(id=id)
        category = get_object_or_404(queryset, id=id)
        serializer = self.get_serializer(category, data=request.data, partial=True)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data, status=200)
        else:
            return Response(serializer.errors, status=400)

    def create(self, request):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=201)
        return Response({"detail" : "All fields are neccessary"}, status=400)


class QusetionViewSet(viewsets.ModelViewSet):
    serializer_class = QuestionSerializer
    permission_classes = [IsAuthenticated]
    authentication_classes = (TokenAuthentication, SessionAuthentication)

    def all_questions(self, r):
        queryset = Question.objects.filter(asked_by=self.request.user.userprofile)
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data, status=200)

    def update(self, request):
        if Question.objects.filter(id=request.data.get("id"), asked_by=self.request.user.userprofile) :
            question = Question.objects.get(id=request.data.get("id"), asked_by=self.request.user.userprofile) 
            serializer = self.get_serializer(question, data=request.data, partial=True)
            if serializer.is_valid(raise_exception=True):
                serializer.save(asked_by=self.request.user.userprofile)
                return Response(serializer.data, status=200)
            return Response(serializer.errors, status=400)
        return Response({"detail" : "no question"}, status=400)

    def create(self, request):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            serializer.save(asked_by=self.request.user.userprofile)
            return Response(serializer.data, status=201)
        return Response({"detail" : "All fields are neccessary"}, status=400)
    

class AnswerViewSet(viewsets.ModelViewSet):
    serializer_class = AnswerSerializer
    permission_classes = [IsAuthenticated]
    authentication_classes = (TokenAuthentication, SessionAuthentication)

    def all_answers(self, request, question_id):
        if not Question.objects.filter(id=question_id).exists():
            return Response({"detail" : "no answer for question"}, status=404)
        queryset = Answer.objects.filter(question=question_id)
        serializer = self.get_serializer(queryset, many=True)
        return Response({"answers" : serializer.data}, status=200)

    def update(self, request, question_id):
        if Question.objects.filter(id=question_id).exists() and Answer.objects.filter(id=request.data.get("id"), answerd_by=self.request.user.userprofile).exists():
            answer = Answer.objects.get(id=request.data.get("id"), answerd_by=self.request.user.userprofile)
            serializer = self.get_serializer(answer, data=request.data, partial=True)
            if serializer.is_valid(raise_exception=True):
                serializer.save(answerd_by=self.request.user.userprofile)
                return Response(serializer.data, status=200)
            return Response(serializer.errors, status=400)
        return Response({"detail" : "no answer"}, status=400)

    def create(self, request, question_id):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            serializer.save(answerd_by=self.request.user.userprofile)
            return Response(serializer.data, status=201)
        return Response({"detail" : "All fields are neccessary"}, status=400)


@api_view(['GET'])
@authentication_classes([])
@permission_classes([])
def search_question(request):
    if request.method == 'GET':
        if 'k' in request.GET and request.GET['k'] != '':
            k = request.GET['k']
            results = Question.objects.filter(
                Q(question__icontains=k)  |
                Q(tags__icontains=k) | 
                Q(category__name__icontains=k)
            ).values()
            return Response({"questions" : results}, status=200)
    
        results = Question.objects.all()[:10].values()
        return Response({"questions" : results}, status=200)
    return Response({"detail" : "only GET"}, status=402)

@api_view(['GET'])
@authentication_classes([])
@permission_classes([])
def get_question_data(request, id):
    if request.method == 'GET':
        if  Question.objects.filter(id=id).exists():
            results = Question.objects.get(id=id)
            return Response({
                "question" : results.question,
                "category" : results.category.name,
                "tags" : results.tags,
                "asked_by" : results.asked_by.name,
                "time" : results.created_at,
                "id" : results.id
            }, status=200)
    
        return Response({"detail" : "no question"}, status=404)
    return Response({"detail" : "only GET"}, status=402)
