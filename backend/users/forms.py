from django.contrib.auth.forms import UserCreationForm, UserChangeForm
from .models import SurBingUser

class SurBingUserCreationForm(UserCreationForm):
    class Meta:
        model = SurBingUser
        fields = ('username', 'email', 'cart')

class SurBingUserChangeForm(UserChangeForm):
    class Meta:
        model = SurBingUser
        fields = ('username', 'email', 'cart')
