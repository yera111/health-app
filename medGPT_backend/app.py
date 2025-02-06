from app.__init__ import create_app

# Условие для запуска приложения
if __name__ == "__main__":
    app = create_app()  # Используем функцию create_app из __init__.py
    app.run(host="127.0.0.1", port=5000, debug=True)
