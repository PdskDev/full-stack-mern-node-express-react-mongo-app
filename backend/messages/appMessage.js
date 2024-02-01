const AppMessage = {
  user: {
    success: {
      user_created: 'User created successfully',
      user_login: 'You are log in successfully',
    },
    error: {
      all_fields_required: 'All fields are required',
      user_exists: 'User already exists',
      invalid_data: 'Invalid user data',
      not_authorized: 'Your are not authorized',
      token_missing: 'Not authorized without token',
    },
  },
  task: {
    success: {
      created: 'Task created successfully',
      deleted: `Task id was deleted successfully`,
      updated: 'Task updated successfully',
    },
    error: {
      not_found: 'Task not found',
      enter_title: 'Please enter task title',
    },
  },
};

module.exports = AppMessage;
