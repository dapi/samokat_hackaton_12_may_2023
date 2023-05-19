from django.db import models
from api.models import Profile
import datetime
# Create your models here.

class RewardProfile(models.Model):
    profile = models.OneToOneField(Profile, related_name="rewardprofile", on_delete=models.CASCADE)
    total_points = models.PositiveIntegerField(default=0)

    def __str__(self) -> str:
        return self.profile
    
class RewardHistory(models.Model):
    reward_profile = models.OneToOneField(Profile, related_name="history", on_delete=models.CASCADE)
    point = models.PositiveIntegerField(default=0)
    reason = models.CharField(max_length=100, null=True, blank=True)
    on = models.DateTimeField(auto_now=True)

    def set_reason(self, type, type_item):
        match type:
            case 1: # Asked question
                self.reason = f"Got points for asking : {type_item.question}"
            case 2: # Answer question
                self.reason = f"Got points for answering : {type_item.question}"
            case 3: # Daily login
                self.reason = f"Got points for login : {str(type_item.date)}"
            case 4: # Start Chat
                self.reason = f"Got points for start chat"
            case _:
                return False
        return True  

    def __str__(self) -> str:
        return self.point  

class DailyLogin(models.Model):
    profile = models
    date = models.DateField(default=datetime.datetime.today())
    on = models.DateTimeField(auto_now=True)
    def __str__(self) -> str:
        return str(self.date)