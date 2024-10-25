---
title: 'Responsive Form Validation in Flutter'
seoTitle: 'Handling form validation in Flutter'
slug: 'form-validation'
description: 'Learn how to handle form validation in Flutter without state management. This guide covers creating responsive forms, minimizing widget rebuilds, and optimizing performance for a smoother user experience'
pubDate: '2024-10-24'
updatedDate: '2024-10-25'
tags: ["Tutorial", "Guide","Flutter"]
coverImage: '../flutter.png'
---
https://github.com/user-attachments/assets/4093a57b-1866-4181-9caf-297c3e86c4da

Handling validation is critical for ensuring that user inputs are correct and legitimate, whether for login forms, password changes, or other types of forms. We will look at how to develop responsive forms while avoiding extra widget rebuilds. Here's an example of how to do form validation in Flutter without using state management. We will concentrate on simplifying the design and optimizing performance to improve the user experience.

## Step 1 Creating the Stateful Widget
First, let's create a StatefulWidget named FormValidation:

- Define `TextEditingController` variables for the full name, email, and password fields:
```dart
  final fullNameController = TextEditingController();
  final emailController = TextEditingController();
```
- Don’t forget to dispose of the controllers to avoid memory leaks:
```dart
  @override
  void dispose() {
    fullNameController.dispose();
    emailController.dispose();
    super.dispose();
  }
```
- Create the input fields using `TextField` for both full name and email:
```dart
Column(
  crossAxisAlignment: CrossAxisAlignment.start,
  children: [
    const Text('Full Name'),
    TextField(
    controller: fullNameController,
    decoration: InputDecoration(
      prefixIcon: const Icon(Icons.person),
      border: const OutlineInputBorder(),
    )
  )
    const Text('Email'),
    TextField(
    controller: emailController,
    decoration: InputDecoration(
      prefixIcon: const Icon(Icons.email),
      border: const OutlineInputBorder(),
    )
  )
  ]
)
```
## Step 2 Handling Focus and Validation
To handle focus and show an error message when the input is invalid (e.g., fewer than 5 characters), follow these steps:
- Create `FocusNode` variables for managing input focus:
```dart
  late FocusNode fullName;
  late FocusNode email;
  
  @override
  void initState() {
    fullName = FocusNode();
    email = FocusNode();
    super.initState();
  }
```
- Update the dispose function to clean up the `FocusNode` objects:
```dart
  @override
  void dispose() {
    fullName.dispose();
    email.dispose();
    fullNameController.dispose();
    emailController.dispose();
    super.dispose();
  }
```
- Implement a function to get the validation error message:
```dart
  String? get errorFullName {
    final text = fullNameController.value.text;
    if (text.isEmpty) {
      return 'Full Name cannot be empty';
    } else if (text.length < 5) {
      return 'The minimum Full Name cannot be less than 5 characters.';
    }
    return null;
  }
```
## Step 3: Ensuring Responsive Rebuilds
To ensure that the widget rebuilds only when the input is invalid, wrap the `TextField` in a `ValueListenableBuilder` and shift the focus to the email field when input for the full name is complete:
```dart
  ValueListenableBuilder(
    valueListenable: fullNameController,
    builder: (context, v, _) {
      return TextField(
        autofocus: true,
        focusNode: fullName,
        controller: fullNameController,
        decoration: InputDecoration(
          prefixIcon: const Icon(Icons.person),
          border: const OutlineInputBorder(),
          errorText: fullName.hasFocus ? errorFullName : null,
        ),
        onSubmitted: (_) {
          fullName.unfocus();
          FocusScope.of(context).requestFocus(email);
        },
      );
    },
  ),
```
## Step 4: Enabling/Disabling the Submit Button
To ensure that the submit button is disabled when the form is invalid:
- First, create a Submit Button
```dart
    ElevatedButton(
      onPressed: () {}
      child: const Text('Submit'),
    ),
```
- Create a boolean function to check if the inputs are valid:
```dart
  bool isValided() {
    if (errorFullName != null || errorEmail != null) {
      return false;
    }
    return true;
  }
```
- Use `ValueListenableBuilder` to rebuild the widget when validation changes:
- Create a `ValueNotifier` to track form validity:

 ```dart
  final isValid = ValueNotifier(false);
 ```

- Wrap the parent Column with ValueListenableBuilder and update the Submit button:
```dart
 ElevatedButton(
   onPressed: isValid.value ? 
   () {print('Holla \n${fullNameController.text} \n ${emailController.text}');} : null,
   child: const Text('Submit'),
 ),
```
- Ensure the form checks validity on every input change:
```dart
 onChanged: (_) {
   isValid.value = isValided();
 },
```

#### Here’s the complete source code for the form:
```dart

class Content extends StatefulWidget {
  const Content({super.key});

  @override
  State<Content> createState() => _ContentState();
}

class _ContentState extends State<Content> {
  late FocusNode fullName;
  late FocusNode email;
  late FocusNode password;

  final fullNameController = TextEditingController();
  final emailController = TextEditingController();
  final passwordController = TextEditingController();

  final isValid = ValueNotifier(false);
  final isVisible = ValueNotifier(true);

  @override
  void initState() {
    fullName = FocusNode();
    email = FocusNode();
    password = FocusNode();
    super.initState();
  }

  @override
  void dispose() {
    fullName.dispose();
    email.dispose();
    password.dispose();
    fullNameController.dispose();
    emailController.dispose();
    passwordController.dispose();
    super.dispose();
  }

  String? get errorFullName {
    final text = fullNameController.value.text;
    if (text.isEmpty) {
      return 'Full Name cannot be empty';
    } else if (text.length < 5) {
      return 'The minimum Full Name cannot be less than 5 characters.';
    }
    return null;
  }

  String? get errorEmail {
    const pattern = r"(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'"
        r'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-'
        r'\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*'
        r'[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4]'
        r'[0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9]'
        r'[0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\'
        r'x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])';
    final regex = RegExp(pattern);
    final text = emailController.value.text;
    if (text.isEmpty) {
      return 'Email cannot be empty';
    } else if (!regex.hasMatch(text)) {
      return 'Email is not valid';
    }
    return null;
  }

  String? get errorPassword {
    final text = passwordController.value.text;
    if (text.isEmpty) {
      return 'Password cannot be empty';
    } else if (text.length < 8) {
      return 'The minimum Full Name cannot be less than 8 characters.';
    }
    return null;
  }

  bool isValided() {
    if (errorFullName != null || errorEmail != null || errorPassword != null) {
      return false;
    }
    return true;
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Form Validation'),
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.symmetric(horizontal: 20),
        child: ValueListenableBuilder(
          valueListenable: isValid,
          builder: (context, v, _) {
            return Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                const Text('Full Name'),
                ValueListenableBuilder(
                  valueListenable: fullNameController,
                  builder: (context, v, _) {
                    return TextField(
                      autofocus: true,
                      focusNode: fullName,
                      controller: fullNameController,
                      decoration: InputDecoration(
                        prefixIcon: const Icon(Icons.person),
                        border: const OutlineInputBorder(),
                        errorText: fullName.hasFocus ? errorFullName : null,
                      ),
                      onChanged: (_) {
                        isValid.value = isValided();
                      },
                      onSubmitted: (_) {
                        fullName.unfocus();
                        FocusScope.of(context).requestFocus(email);
                      },
                    );
                  },
                ),
                const SizedBox(height: 20),
                const Text('Email'),
                ValueListenableBuilder(
                  valueListenable: emailController,
                  builder: (context, v, _) {
                    return TextField(
                      autofocus: true,
                      focusNode: email,
                      controller: emailController,
                      decoration: InputDecoration(
                        prefixIcon: const Icon(Icons.email),
                        border: const OutlineInputBorder(),
                        errorText: email.hasFocus ? errorEmail : null,
                      ),
                      onChanged: (_) {
                        isValid.value = isValided();
                      },
                      onSubmitted: (_) {
                        email.unfocus();
                        FocusScope.of(context).requestFocus(password);
                      },
                    );
                  },
                ),
                const SizedBox(height: 20),
                const Text('Password'),
                ValueListenableBuilder(
                    valueListenable: isVisible,
                    builder: (context, v, _) {
                      return ValueListenableBuilder(
                        valueListenable: passwordController,
                        builder: (context, v, _) {
                          return TextField(
                            autofocus: true,
                            focusNode: password,
                            controller: passwordController,
                            obscureText: isVisible.value,
                            decoration: InputDecoration(
                              prefixIcon: const Icon(Icons.lock),
                              border: const OutlineInputBorder(),
                              errorText: password.hasFocus ? errorPassword : null,
                              suffixIcon: IconButton(
                                onPressed: () {
                                  isVisible.value = !isVisible.value;
                                },
                                icon: Icon(
                                  isVisible.value ? Icons.visibility_off : Icons.visibility,
                                ),
                              ),
                            ),
                            onChanged: (_) {
                              isValid.value = isValided();
                            },
                            onSubmitted: (_) {
                              password.unfocus();
                            },
                          );
                        },
                      );
                    }),
                const SizedBox(height: 20),
                ElevatedButton(
                  onPressed: isValid.value
                      ? () {
                          showDialog(
                            context: context,
                            builder: (context) {
                              return Dialog(
                                child: Container(
                                  padding: const EdgeInsets.all(20),
                                  width: double.infinity,
                                  height: 100,
                                  child: Text(
                                    'Holla \n${fullNameController.text} \n ${emailController.text}',
                                  ),
                                ),
                              );
                            },
                          );
                        }
                      : null,
                  child: const Text('Submit'),
                ),
              ],
            );
          },
        ),
      ),
    );
  }
}
```
