from django.contrib import admin

from .models import Office, Department, Position, Profile, Social, Image, Experience, Account
# Register your models here.

admin.site.register(Office)
admin.site.register(Department)
admin.site.register(Position)
admin.site.register(Profile)
admin.site.register(Social)
admin.site.register(Image)
admin.site.register(Experience)
admin.site.register(Account)

