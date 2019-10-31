from django.contrib import admin
from .models import Survey, Item, Response, Cart
# Register your models here.

admin.site.register(Survey)
admin.site.register(Item)
admin.site.register(Response)
admin.site.register(Cart)
