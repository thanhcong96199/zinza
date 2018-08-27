from model.connect_db import DatabaseDriver

class Containers:
    @staticmethod
    def get_container(container_id):
        query = 'select * from ' \
                '(select *from users left join containers  on users.user_id = containers.container_id) as a ' \
                'left join images on  a.user_id = images.image_id ' \
                'where a.container_id = ?'
        args = [container_id]
        result = DatabaseDriver().query_db(query, args, one=True)
        return result

    # ======== get information of one container

    @staticmethod
    def get_all_container():
        query = 'select * from ' \
                '(select *from users left join containers  on users.user_id = containers.container_id) as a ' \
                'left join images on  a.user_id = images.image_id'
        result = DatabaseDriver().query_db(query, one=True)
