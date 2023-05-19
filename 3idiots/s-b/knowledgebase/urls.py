from django.urls import path
from .views import CategoryViewSet, QusetionViewSet, AnswerViewSet
from . import views
from .doc_bot import DocumentationViewSet

urlpatterns = [
    path('category/', CategoryViewSet.as_view({
        "get" : "category_details",
        "post" : "create",
        "put" : "update",
    }), name="category_view_set"),


    path('question/', QusetionViewSet.as_view({
        "get" : "all_questions",
        "post" : "create",
        "put" : "update",
    }), name="question_view_set"),


    path('answer/<str:question_id>/', AnswerViewSet.as_view({
        "get" : "all_answers",
        "post" : "create",
        "put" : "update",
    }), name="category_view_set"),


    path('chat/', DocumentationViewSet.as_view({
        "post" : "ask_doc_dot"
    }), name="chatbase"),

    path('search/', views.search_question, name="q_search"),
    path('search/<str:id>/', views.get_question_data , name="get_question_data"),
]
