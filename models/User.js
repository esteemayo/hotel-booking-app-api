import crypto from 'crypto';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please tell us your name'],
  },
  username: {
    type: String,
    trim: true,
    unique: true,
    lowercase: true,
    required: [true, 'Please tell us your username'],
    match: [/^[a-zA-Z0-9]+$/, 'Username is invalid'],
  },
  email: {
    type: String,
    required: [true, 'Please provide your email address'],
    trim: true,
    unique: true,
    lowercase: true,
    match: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\0-9]+\.)+[a-zA-Z]{2,}))$/,
      'Please enter a valid email address',
    ],
  },
  password: {
    type: String,
    required: [true, 'Please provide your password'],
    minlength: 8,
    maxlength: 1024,
    select: false,
  },
  confirmPassword: {
    type: String,
    required: [true, 'Please confirm your password'],
    minlength: 8,
    maxlength: 1024,
    validate: {
      validator: function (val) {
        return val === this.password;
      },
      message: 'Passwords do not match',
    },
  },
  role: {
    type: String,
    enum: {
      values: ['user', 'admin'],
      message: 'Role is either: user or admin',
    },
    default: 'user',
  },
  active: {
    type: Boolean,
    default: true,
  },
  resetPasswordToken: String,
  resetPasswordExpires: Date,
  passwordChangedAt: Date,
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
});

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

  this.password = await bcrypt.hash(this.password, 12);
  this.confirmPassword = undefined;
});

const User = mongoose.models.User || mongoose.model('User', userSchema);

export default User;
