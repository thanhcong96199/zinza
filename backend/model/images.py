from model.connect_db import DatabaseDriver


class Images:

    @staticmethod
    # get size from docker and inser database
    def get_size_image():
        pass


    @staticmethod
    # get all information image
    def get_all_images():
        query = 'select * from images'
        result = DatabaseDriver().query_db(query)
        return result


    @staticmethod
    # get one information image
    def get_image(image_id):
        query = 'select * from images where image_id = ?'
        args = [image_id]
        result = DatabaseDriver().query_db(query, args, one=True)
        return result


    @staticmethod
    # create image
    def create_image(name, group, size):


        query = 'insert into images(image_name, isize, igroup) values (?, ?, ?)'
        args = [name, size, group]
        result = result = DatabaseDriver().query_db(query, args, one=True)
        return  result

    @staticmethod
    # edit image
    def edit_image(image_id, image_name, isize, igroup):
        query = 'update images set image_name = ?, isize = ?, igroup = ? where image_id = ?'

        args = [image_name, isize, igroup, image_id]
        result = DatabaseDriver().query_db(query, args, one=True)
