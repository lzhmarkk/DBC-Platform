from django.db import models

import pyodbc


# Create your models here.
db = pyodbc.connect("""Driver={MySQL ODBC 8.0 ANSI Driver};
                       Server=localhost;
                       Database=dbc_task_1;
                       User=root;
                       Password=qushuo;
                       Charset=utf8;
                    """)
cursor = db.cursor()


class Model:
    def __init__(self, sql):
        self.sql = sql

    @staticmethod
    def select(*columns):
        sql = 'select '
        for column in columns:
            sql += column + ', '
        sql = sql[:-2]

        return Model(sql)

    def from_tables(self, *tables):
        self.sql += ' from '
        for table in tables:
            self.sql += table + ', '
        self.sql = self.sql[:-2]

        return Model(self.sql)

    def all(self):
        print(self.sql)
        return cursor.execute(self.sql).fetchall()

    def top(self, num):
        rows = cursor.execute(self.sql).fetchall()
        if num > len(rows):
            return rows
        else:
            return rows[:num]

    def filter(self, *odds):
        self.sql += ' where '
        for odd in odds:
            self.sql += odd + ' and '
        self.sql = self.sql[:-5]

        return Model(self.sql)

    def order_by(self, *columns):
        self.sql += ' order by '
        for column in columns:
            self.sql += column + ', '
        self.sql = self.sql[:-2]

        return Model(self.sql)

    @staticmethod
    def insert(table, **kw):
        sql = 'insert into ' + table + ' ('
        for k in kw.keys():
            sql += k + ', '
        if sql[-2:] == ', ':
            sql = sql[:-2]
        sql += ')' + ' values ' + '('
        for v in kw.values():
            sql += "'" + str(v) + "'" + ', '
        if sql[-2:] == ', ':
            sql = sql[:-2]
        sql += ')'

        return Model(sql)

    @staticmethod
    def upgrade(table, **kw):
        sql = 'upgrade ' + table + ' set '
        for k, v in kw.items():
            sql += k + '=' + str(v) + ', '
        sql = sql[:-2]

        return Model(sql)

    @staticmethod
    def delete(table):
        sql = 'delete from ' + table
        
        return Model(sql)

    def execute(self):
        cursor.execute(self.sql)
        db.commit()


if __name__ == '__main__':
    order = Model.select('*').from_tables('orders').filter('order_id=' + str(1)).all()
    print(order)