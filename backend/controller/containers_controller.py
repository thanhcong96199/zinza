#from dockers.service import  DockerService
from model.containers import Containers

def create_container(request):
	params = request.get_json()
	user_id = params['user_id']
	image = params['image_name']
	cpu = params['cpu']
	memory = params['memory']
	port = params['port']
	container_password = params['container_password']
	pass



def show_all_container(request):
	pass

def show_container_detail(request):
	pass

def update_container(request):
	pass

def delete_container(request):
	pass