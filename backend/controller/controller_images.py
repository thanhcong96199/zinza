from model import images
from model.connect_db import DatabaseDriver
from model.images import Images
import json
from flask import request




# ============ get size of Image from docker
def get_size():

    pass




# ===================show all information of images
def show_all_images(request):
    result = Images.get_all_images()
    return json.dumps(result)

# ============== show one information of iamges
def get_image(rquest):
    params = request.get_json()
    id = params['image_id']
    result = Images.get_image(id)
    return json.dumps(result)

# =========== create image ===========
def create_image(request):
    params = request.get_json()
    image_name = params['image_name']
    igroup = params['igroup']
    if (image_name is None) and (igroup is None):
        return json.dumps({'result': False, 'mess':"Write information"})
    else:
        result = Images.create_image(image_name, igroup)
        return json.dumps(result)


# ================== delete images =============
def delete_image(request):
    params = request.get_json()
    id = params['image_id']
    result = Images.delete_image(id)
    return json.dumps(result)

# ======== edit images===========
def edit_image(request):
    params = request.get_json()
    id = params['image_id']
    result = Images.edit_image(id)
    return json.dumps(result)
