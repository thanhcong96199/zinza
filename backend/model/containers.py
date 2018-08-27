from model.connect_db import DatabaseDriver

class Containers:
    # ======== get information of one container
    @staticmethod
    def get_container(container_id):
        query = 'select * from ' \
                '(select *from users join containers  on users.user_id = containers.container_id) as a ' \
                'left join images on  a.user_id = images.image_id ' \
                'where a.container_id = ?'
        args = [container_id]
        result = DatabaseDriver().query_db(query, args, one=True)
        return result


# ========= get all container ================
    @staticmethod
    def get_all_container():
        query = 'select * from ' \
                '(select *from users join containers  on users.user_id = containers.container_id) as a ' \
                'left join images on  a.user_id = images.image_id'
        result = DatabaseDriver().query_db(query)
        return result


# ========= delete ===========
    @staticmethod
    def del_container(container_id):
        try:
            driver = DatabaseDriver()
            args = [container_id]
            driver.exec_command("""delete from containers where container_id=?""", args)
        except Exception as e:
            print(e)
            return False
        return True

# =========== edit container ========
    @staticmethod
    def edit_container(cpu, memory, port, container_password, container_id):
        try:
            driver = DatabaseDriver()
            args = [cpu, memory, port, container_password, container_id]
            driver.exec_command("""update containers set 
                                       cpu=?, 
                                       memory=?, 
                                       port=?, 
                                       container_password=?
                                       
                                       where container_id =?""", args)
        except Exception as e:
            print(e)
            return False
        return True

    # ======== create container =========
    @staticmethod
    def create_container(image, cpu, memory, port, container_password, user_id):
        try:
            driver = DatabaseDriver()
            args = [image, cpu, memory, port, container_password, user_id]
            new_id = driver.exec_command("""insert into users( image, cpu, memory, port, container_password)
                                             values (?, ?, ?, ?, ?)""", args)
            return new_id
        except Exception as e:
            print(e)
            return False