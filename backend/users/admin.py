from django.contrib import admin
from django.contrib.auth.admin import UserAdmin

from .forms import SurBingUserCreationForm, SurBingUserChangeForm
from .models import SurBingUser

class SurBingUserAdmin(UserAdmin):
    add_form = SurBingUserCreationForm
    form = SurBingUserChangeForm
    model = SurBingUser
    list_display = ['email', 'username', 'cart', 'age', 'gender', 'point']
    fieldsets = UserAdmin.fieldsets + ((None, {'fields': ('cart', 'age', 'gender', 'point')}),)

admin.site.register(SurBingUser, SurBingUserAdmin)
