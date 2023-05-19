from django.urls import path

# from .user_account import UserAccountViewSet
from . import user_account
from .user_profile import ProfileViewSet
from .department_and_position import DepartmentViewSet, PositionViewSet, OfficeViewSet
from .image_and_experience import ImageViewSet, SocailViewSet, ExperienceViewSet
from .user_account import UserAccountViewSet
from rest_framework.authtoken.views import ObtainAuthToken
from . import views

urlpatterns = [
    path('cookie/csrf/', user_account.set_csrf_token, name="set_csrf_token"),
    path("user/login/", ObtainAuthToken.as_view(), name='api_token_auth'), # 
    path("user/signup/", user_account.signup_new_user, name='signup_new_user'), #
    path("user/verify/", user_account.otp_verification, name='otp_verification'), 
    path("user/", UserAccountViewSet.as_view({
        'get' : 'user_details',
        'put' : 'update'
    }), name="user_account_manager"), 

    path('profile/', ProfileViewSet.as_view({
        'get' : 'profile_details',
        'put' : 'update',
        'post' : 'create'
    }), name="user_profile_manager"),


    path('experience/', ExperienceViewSet.as_view({
        'get' : 'all_experiences',
        'post' : 'create',
        'put' : 'update',
    }), name="experiene_manager"),


    path('image/', ImageViewSet.as_view({
        'get' : 'all_images',
        'post' : 'create',
        'put' : 'update',
    }), name="image_manager"),

    path('social/', SocailViewSet.as_view({
        'get' : 'all_socails',
        'post' : 'create',
        'put' : 'update',
    }), name="social_manager"),


    path('department/', DepartmentViewSet.as_view({
        'get' : 'all_departments',
        'post' : 'create',
    }), name="social_update"),

    path('position/', PositionViewSet.as_view({
        'get' : 'all_positions',
        'post' : 'create',
    }), name="social_update"),

    path('office/', OfficeViewSet.as_view({
        'get' : 'all_offices',
        'post' : 'create',
    }), name="social_update"),

    path('search/', views.search_profile, name="searchprofile"),
    path('search/<str:id>/', views.get_profile_data, name="get_profile_data")

]
