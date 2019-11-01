from django.contrib import admin
from django.contrib.auth import get_user_model
from django.contrib.auth.admin import UserAdmin

from .forms import SurBingUserCreationForm, SurBingUserChangeForm
from .models import SurBingUser

class SurBingUserAdmin(UserAdmin):
    add_form = SurBingUserCreationForm
    form = SurBingUserChangeForm
    model = SurBingUser
    list_display = ['email', 'username', 'cart',]
    fieldsets = UserAdmin.fieldsets + (
            (None, {'fields': ('cart',)}),
    )

admin.site.register(SurBingUser, SurBingUserAdmin)
