import User from "../models/User.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

// Регистрация нового пользователя (ученика)
export const register = async (req, res) => {
  try {
    const { name, class: classGroup } = req.body;

    if (!name || !classGroup) {
      return res
        .status(400)
        .json({ message: "Все поля обязательны для заполнения" });
    }

    // Проверка существования пользователя
    const existingUser = await User.findOne({ name });
    if (existingUser) {
      return res
        .status(409)
        .json({ message: "Пользователь с таким именем уже существует" });
    }

    // Создание нового пользователя
    const user = new User({
      name,
      class: classGroup,
      role: "USER",
    });

    const savedUser = await user.save();

    // Создание JWT токена
    const token = jwt.sign(
      {
        id: savedUser._id,
        role: savedUser.role,
      },
      process.env.JWT,
      { expiresIn: "30d" }
    );

    res.status(201).json({
      userdata: savedUser,
      token,
    });
  } catch (error) {
    console.error("Ошибка при регистрации:", error);
    res.status(500).json({ message: "Ошибка сервера при регистрации" });
  }
};

// Авторизация администратора
export const loginAdmin = async (req, res) => {
  try {
    const { name, password } = req.body;

    if (!name || !password) {
      return res
        .status(400)
        .json({ message: "Все поля обязательны для заполнения" });
    }

    // Проверка существования пользователя
    const user = await User.findOne({ name });
    if (!user) {
      return res.status(404).json({ message: "Пользователь не найден" });
    }

    // Проверка пароля администратора
    const isPasswordCorrect = await bcrypt.compare(
      password,
      process.env.ADMIN,
      process.env.SALT
    );

    if (!isPasswordCorrect) {
      return res.status(401).json({ message: "Неверный пароль" });
    }

    // Создание JWT токена
    const token = jwt.sign(
      {
        id: user._id,
        role: "ADMIN",
      },
      process.env.JWT,
      { expiresIn: "30d" }
    );

    res.json({
      userdata: {
        ...user._doc,
        role: "ADMIN",
      },
      token,
    });
  } catch (error) {
    console.error("Ошибка при входе администратора:", error);
    res.status(500).json({ message: "Ошибка сервера при входе" });
  }
};

// Авторизация обычного пользователя
export const loginUser = async (req, res) => {
  try {
    const { name, class: classGroup } = req.body;

    if (!name || !classGroup) {
      return res
        .status(400)
        .json({ message: "Все поля обязательны для заполнения" });
    }

    // Проверка существования пользователя
    const user = await User.findOne({ name, class: classGroup });
    if (!user) {
      return res.status(404).json({ message: "Пользователь не найден" });
    }

    // Создание JWT токена
    const token = jwt.sign(
      {
        id: user._id,
        role: user.role,
      },
      process.env.JWT,
      { expiresIn: "30d" }
    );

    res.json({
      userdata: user,
      token,
    });
  } catch (error) {
    console.error("Ошибка при входе пользователя:", error);
    res.status(500).json({ message: "Ошибка сервера при входе" });
  }
};

// Получение данных пользователя по ID
export const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "Пользователь не найден" });
    }
    res.json(user);
  } catch (error) {
    console.error("Ошибка при получении данных пользователя:", error);
    res
      .status(500)
      .json({ message: "Ошибка сервера при получении данных пользователя" });
  }
};

export const getUserDate = async (req, res) => {
  try {
    // const token = req.headers.authorization;

    // if (!token) {
    //   return res.status(401).json({ message: "Токен не предоставлен" });
    // }
    // const decoded = jwt.verify(token, process.env.JWT);

    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ message: "Пользователь не найден" });
    }

    res.json(user);
    
  } catch (error) {
    console.error("Ошибка при получении данных пользователя:", error);
    res
      .status(500)
      .json({ message: "Ошибка сервера при получении данных пользователя" });
  }
};

// Получение списка всех пользователей (только для администраторов)
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    console.error("Ошибка при получении списка пользователей:", error);
    res
      .status(500)
      .json({ message: "Ошибка сервера при получении списка пользователей" });
  }
};
