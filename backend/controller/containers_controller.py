from dockers.service import  DockerService
from model.containers import Containers
from model.images import Images
import json
# ========= create container =============
def create_container(request):
	params = request.get_json()
	user_id = params['user_id']
	image = params['image_name']
	cpu = params['cpu']
	memory = params['memory']
	port = params['port']
	container_password = params['container_password']

	if (cpu is not None) and (memory is not None) and (port is not None) and (container_password is not None) and (image is not None) and (user_id is not None):
		image_id = Images.get_image_id(image)['image_id']
		result = Containers.create_container(image_id, cpu, memory, port, container_password, user_id)

		started = DockerService.start_container(image, cpu, memory, port, container_password)

		return json.dumps({'result': result})


	else:
		return json.dumps({'result': False, 'mess': 'Write Information'})


# =========== show all container ==============
def show_all_container(request):
	result = Containers.get_all_container()
	return json.dumps(result)


def show_container_detail(request):
	params = request.get_json()
	container_id = params['container_id']
	result = Containers.get_container(container_id)
	return json.dumps(result)

def update_container(request):

	params = request.get_json()
	container_id = params['container_id']
	cpu = params['cpu']
	memory = params['memory']

	port = params['port']
	container_password = params['container_password']
	result = Containers.edit_container( cpu, memory, port, container_password, container_id)

	return json.dumps({'result': True}) if result else json.dumps({'result': False})


def delete_container(request):
	params = request.get_json()
	container_id = params['container_id']
	result = Containers.del_container(container_id)

	return json.dumps({'result': True}) if result else json.dumps({'result': False})