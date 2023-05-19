from django.db.models import Q 
from .models import Profile, Social, Experience, Image
from django.http import JsonResponse
import json
from rest_framework.response import Response

from rest_framework.decorators import api_view, authentication_classes, permission_classes



@api_view(['GET'])
@authentication_classes([])
@permission_classes([])
def search_profile(request):
    if request.method == 'GET':
        if 'k' in request.GET and request.GET['k'] != '':
            k = request.GET['k']

            results = Profile.objects.filter(
                Q(name__icontains=k)  |
                Q(department__department_name__icontains=k) | 
                Q(position__position_name__icontains=k) |
                Q(office__office_location__icontains=k)
            ).values()
            return Response({"profiles" : results}, status=200)
    
        results = Profile.objects.all()[:10].values()
        return Response({"profiles" : results}, status=200)
    return Response({"detail" : "only GET"}, status=402)



@api_view(['GET'])
@authentication_classes([])
@permission_classes([])
def get_profile_data(request, id):
    if request.method == 'GET':
        if Profile.objects.filter(id=id).exists():
            pr = Profile.objects.get(id=id)
            return Response({
                "id": pr.id,
                "user_id": pr.user.id,
                "name": pr.name,
                "gender": pr.gender,
                "age": pr.age,
                "department": pr.department.department_name,
                "position": pr.position.position_name,
                "office": pr.office.office_location,
                "description": pr.description,
                "contact": pr.contact,
                "address": pr.address,
                "socails" : Social.objects.filter(profile=pr).values(),
                "images" : Image.objects.filter(profile=pr).values(),
                "experiences" : Experience.objects.filter(profile=pr).values()
            }, status=200)
        return Response({"detail" : "profile not exists"}, status=404)
    return Response({"detail" : "only GET"}, status=402)