from django.shortcuts import render, redirect
from django.urls import reverse
from django.contrib import messages
from models import User
# from datetime import datetime

# Create your views here.
def index(request):
    return render(request, 'login_reg/index.html')

def login(request):
    result = User.objects.loginValidate(request)

    if result[0] == False:
        show_messages(request, result[1])
        return redirect(reverse('user_con:index'))

    return log_in_user(request, result[1])

def register(request):
    result = User.objects.regValidate(request)

    if result[0] == False:
        show_messages(request, result[1])
        return redirect(reverse('user_con:index'))

    return log_in_user(request, result[1])


def show_messages(request, message_list):
    for message in message_list:
        messages.add_message(request, messages.INFO, message)

def log_in_user(request, user):
    request.session['user'] = {
        'id': user.id,
        'first_name': user.first_name,
        'user_name': user.user_name,
    }
    return redirect(reverse('travels:index'))

def logout(request):
    request.session.clear()
    return redirect(reverse('user_con:index'))
