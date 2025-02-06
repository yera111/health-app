class User:
    FAKE_USERS = [
        {"id": 1, "username": "user1", "age": 25, "bmi": 24.5},
        {"id": 2, "username": "user2", "age": 30, "bmi": 20},
        {"id": 3, "username": "user3", "age": 22, "bmi": 18},
    ]

    @staticmethod
    def get_all():
        return User.FAKE_USERS
