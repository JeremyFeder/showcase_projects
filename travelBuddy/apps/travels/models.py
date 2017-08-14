from __future__ import unicode_literals
from django.db import models
from django.utils.timezone import now
from datetime import datetime
from ..login_reg.models import User

class ItemManager(models.Manager):

    def validItem(self, request):
        errors = []
        now = datetime.now()



        if Item.objects.filter(dest=request.POST['dest']):
            errors.append("That Destination already exists!")

        if len(request.POST['dest']) < 2:
            errors.append("The Destination field may not be left blank and must contain at least 2 characters.")

        if len(request.POST['plan']) < 2:
            errors.append("The Description field may not be left blank and must contain at least 2 characters (up to 144!).")

        if len(request.POST['trav_start']) >= 0:
            try:
                strp_trav_dateS = datetime.strptime(request.POST['trav_start'], '%Y-%m-%d')
                print "Stripped The Time"
            except:
                # strp_trav_date = datetime.strptime(request.POST['trav_start'], '%Y-%m-%d')
                errors.append('Please enter a valid date for travel time.')
        if datetime.strptime(request.POST['trav_start'], '%Y-%m-%d') < now:
            errors.append('Please Select a Future Date!')


        if len(request.POST['trav_end']) >= 0:
            try:
                strp_trav_dateE = datetime.strptime(request.POST['trav_end'], '%Y-%m-%d')
                print "Stripped The Time"
            except:
                # strp_trav_date = datetime.strptime(request.POST['trav_end'], '%Y-%m-%d')
                errors.append('Please enter a valid date for travel time.')
        if datetime.strptime(request.POST['trav_end'], '%Y-%m-%d') < now:
            errors.append('Please Select a Future Date!')


        if datetime.strptime(request.POST['trav_end'], '%Y-%m-%d') < datetime.strptime(request.POST['trav_start'], '%Y-%m-%d'):
            errors.append('Your return date cannot be before your trip even begins!')

        if errors:
            return(False, errors)

        curr_user = User.objects.get(id=request.session['user']['id'])

        item = self.create(creator=curr_user, dest=request.POST['dest'], addby=request.POST['addby'], plan=request.POST['plan'], trav_start=request.POST['trav_start'], trav_end=request.POST['trav_end'])

        return (True, item)

    def fetch_item_users(self, item_id):
        print "banana"
        item_id = int(item_id)
        item = self.get(id=item_id)
        users = item.users.all()
        return (item, users)

    def remove_item(self, user_id, item_id):
        int(item_id)
        # get user and itms to remove
        try:
            user = User.objects.get(id=user_id)
            item = self.get(id=item_id)
            item.users.remove(user)
            return True
        except:
            return False

    def add_item(self, user_id, item_id):
        int(item_id)
        # get user and items to add
        try:
            user = User.objects.get(id=user_id)
            item = self.get(id=item_id)
            item.users.add(user)
            return True
        except:
            return False

    def get_my_items(self, user_id):
        items = self.filter(users__id=user_id)
        return items

    def get_other_items(self, user_id):
        items = self.exclude(users__id=user_id)
        return items


    def update(self, id, form_info):
        item = Item.objects.get(id=id)
        item.itm = form_info['dest']
        item.addby = form_info['addby']
        item.dateadd = form_info['dateadd']
        item.save()


class Item(models.Model):
    users = models.ManyToManyField(User, related_name="items")
    creator = models.ForeignKey(User)
    dest = models.CharField(max_length=45)
    addby = models.CharField(max_length=45)
    plan = models.CharField(max_length=144)
    trav_start = models.DateTimeField()
    trav_end = models.DateTimeField()
    dateadd = models.DateTimeField(auto_now_add=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    objects = ItemManager()
