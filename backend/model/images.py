from model.connect_db import DatabaseDriver


class Images:

    @staticmethod
    # get image_name
    def get_image_name(image_id):
        query = 'select * from images where image_id = ?'
        args = [image_id]
        result = DatabaseDriver().query_db(query, args, one=True)
        return result


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
    def create_image(name, group):


        query = 'insert into images(image_name, igroup) values (?, ?)'
        args = [name, group]
        result = result = DatabaseDriver().query_db(query, args, one=True)
        return  result

    @staticmethod
    # edit image
    def edit_image(image_id, image_name, igroup):
        query = 'update images set image_name = ?,  igroup = ? where image_id = ?'

        args = [image_name,  igroup, image_id]
        result = DatabaseDriver().query_db(query, args, one=True)

    @staticmethod
    # delete image
    def delete_image(image_id):
        result = DatabaseDriver().query_db('delete from images where image_id = ?', image_id)
        return result