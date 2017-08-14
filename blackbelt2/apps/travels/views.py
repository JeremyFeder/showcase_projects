from django.shortcuts import render, redirect
from django.urls import reverse
from django.contrib import messages
from models import Item
from ..login_reg.models import User


def users(request):
    if 'user' in request.session:
        if request.method == "POST":
            return create(request)
        print "got here"
        return index(request)
    else:
        return redirect(reverse('user_con:index'))

def users_w_id(request, id):
    if 'user' in request.session:
        if request.method == "POST":
            return update(request, id)
        return show(request, id)
    else:
        return redirect(reverse('user_con:index'))

def index(request):
    # Retrieve all items to display in template
    if 'user' in request.session:
        # items = Item.objects.all()
        context = {
            'my_items': Item.objects.get_my_items(request.session['user']['id']),
            'other_items': Item.objects.get_other_items(request.session['user']['id']),
        }
        return render(request, 'travels/index.html', context)
    else:
        return redirect(reverse('user_con:index'))

# POST /users
def create(request):
    if 'user' in request.session:
        result = Item.objects.validItem(request)

        if result[0] == False:
            show_messages(request, result[1])
            print "blargggg failed to create destination"
            return redirect(reverse('travels:new'))
        print "made a destination, yeahhhh"
        return redirect('/travels')
    else:
        return redirect(reverse('user_con:index'))

# GET /users/new  uses new.html to then create an item
def new(request):
    if 'user' in request.session:
        return render(request, 'travels/new.html')
    else:
        return redirect(reverse('user_con:index'))

#show validation messages on adding new item
def show_messages(request, message_list):
    for message in message_list:
        messages.add_message(request, messages.INFO, message)

def show(request, item_id):
    if 'user' in request.session:
        item, users = Item.objects.fetch_item_users(item_id)
        context = {
            'users': users,
            'item_name': item.dest,
            'item_by': item.addby,
            'item_de': item.plan,
            'item_st': item.trav_start,
            'item_en': item.trav_end,
        }
        return render(request, 'travels/show.html', context)
    else:
        return redirect(reverse('user_con:index'))

def add(request, item_id):
    if 'user' in request.session:
        response = Item.objects.add_item(request.session['user']['id'], item_id)
        return redirect(reverse('travels:index'))
    else:
        return redirect(reverse('user_con:index'))

def remove(request, item_id):
    if 'user' in request.session:
        response = Item.objects.remove_item(request.session['user']['id'], item_id)
        return redirect(reverse('travels:index'))
    else:
        return redirect(reverse('user_con:index'))

def update(request, id):
    if 'user' in request.session:
        Item.objects.update(id, request.POST)
        return redirect('/travels')
    else:
        return redirect(reverse('user_con:index'))

# POST /users/<id>/destroy

def destroy(request, id):
    if 'user' in request.session:
        item = Item.objects.get(id=id)
        if request.session['user']['user_name'] == item.addby:
            item.delete()
            print "Item DELETED!!!"
            return redirect('/travels')
    return redirect(reverse('user_con:index'))
