const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const _ = require("lodash");

const Users = require("../models/authentication");

var transport = nodemailer.createTransport({
  // host: "smtp.mailtrap.io",
  // port: 2525,
  // auth: {
  //   user: "be223fd8c84052",
  //   pass: "d3389db1e94241",
  //}

  service: "gmail",
  auth: {
    user: "traveller07authentication@gmail.com",
    pass: "Traveller@123",
  },
});

exports.signUp = (req, res) => {
  const { name, email, password } = req.body;

  Users.findOne({ email }).exec((err, user) => {
    if (err) {
      return res.status(401).json({
        error: "Something went wrong!!",
      });
    }

    if (user) {
      return res.status(400).json({
        error: "Email already exists!!",
      });
    }

    const token = jwt.sign(
      { name, email, password },
      process.env.JWT_ACCOUNT_ACTIVATION,
      {
        expiresIn: "10m",
      }
    );

    const activateLink = `${process.env.CLIENT_URL}/traveller/activate/${token}`;

    const emailData = {
      to: [
        {
          address: email,
          name,
        },
      ],
      from: {
        address: process.env.EMAIL_FROM,
        name: "TRAVELLER, AUTH",
      },
      subject: "Account Activation Link",
      html: `
          <div>
            <h1>Please use the following link to activate the account.</h1>
            <a href="${activateLink}" target="_blank">
              ${activateLink}
            </a>
            <hr />
            <p>This email contains sensitive information</p>
            <a href="${process.env.CLIENT_URL}" target="_blank">
              ${process.env.CLIENT_URL}
            </a>
          </div>
        `,
    };

    transport.sendMail(emailData, (err, info) => {
      if (err) {
        return res.status(400).json({
          error: err,
        });
      }

      res.json({
        message: `Email has been successfully sent to ${email}. Follow the instructions i the email to activate your account.`,
      });
    });
  });
};

exports.activateAccount = (req, res) => {
  const { token } = req.body;

  if (token) {
    return jwt.verify(token, process.env.JWT_ACCOUNT_ACTIVATION, (err) => {
      if (err) {
        return res.status(400).json({
          error: `Token expired ${err}`,
        });
      }
      const { name, email, password } = jwt.decode(token);
      const newUser = new Users({ name, email, password });

      Users.findOne({ email }).exec((err, user) => {
        if (err) {
          return res.status(400).json({
            error: "Something went error.",
          });
        }

        if (user) {
          return res.status(400).json({
            error: "The account has already been activated.",
          });
        }

        newUser.save((err, userData) => {
          if (err) {
            return res.status(400).json({
              error: `Something went wrong ${err}`,
            });
          }
          res.json({ message: `${name} welcome to Traveller` });
        });
      });
    });
  }
  return res.status(400).json({
    error: `Token is invalid`,
  });
};

exports.signIn = (req, res) => {
  const { email, password } = req.body;

  Users.findOne({ email }).exec((err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: `user with given email doesn't exist  ${err}`,
      });
    }

    if (!user.authenticate(password)) {
      return res.status(401).json({
        error: `incorrect password ${err}`,
      });
    }

    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "2d",
    });
    const { _id, name, email } = user;
    return res.json({
      token,

      user: {
        _id,
        email,
        name,
      },
      message: `SIGNEDIN SUCCESSFULLY`,
    });
  });
};

exports.forgotPassword = (req, res) => {
  const { email } = req.body;

  Users.findOne({ email }).exec((err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: `user with thhis email doesn't exist`,
      });
    }

    const token = jwt.sign(
      { _id: user._id, name: user.name },
      process.env.JWT_RESET_PASSWORD,
      {
        expiresIn: "30m",
      }
    );

    const link = `${process.env.CLIENT_URL}/traveller/reset/password/${token}`;

    const emailData = {
      to: email,
      from: process.env.EMAIL_FROM,
      subject: "Password Reset Link",
      html: `
        <div>
            <h2> Follow the link to reset password </h2>
            <a href= "${link}" target= "_blank" > ${link} </a>
        </div>`,
    };

    return user.updateOne({ resetPasswordLink: token }).exec((err, success) => {
      if (err) {
        return res.status(400).json({
          error: `There has been error in saving the reset password link`,
        });
      }

      transport.sendMail(emailData, (err, info) => {
        if (err) {
          return res
            .status(400)
            .json({ error: `error in sending mail to the user ${err}` });
        }
        res.json({
          message: `email has been successfully sent to the ${email}`,
        });
      });
    });
  });
};

exports.resetPassword = (req, res) => {
  const { newPassword, resetPasswordLink } = req.body;

  if (resetPasswordLink) {
    return jwt.verify(
      resetPasswordLink,
      process.env.JWT_RESET_PASSWORD,
      (err) => {
        if (err) {
          return res.status(400).json({
            error: ` token expired ${err}`,
          });
        }

        Users.findOne({ resetPasswordLink }).exec((err, user) => {
          if (err) {
            return res.status(400).json({
              error: `  SOmeting went wrong in reset password link ${err}`,
            });
          }

          const updateFields = {
            password: newPassword,
            resetPasswordLink: "",
          };

          user = _.extend(user, updateFields);

          user.save((err, user) => {
            if (err) {
              return res.status(400).json({
                error: `Error in updating new password ${err}`,
              });
            }

            res.json({ message: `new password  successfullyUpdated` });
          });
        });
      }
    );
  }
  return res.status(400).json({
    error: "We have not received the reset password link",
  });
};

// exports.signup = (req, res) => {
//   const { name, email, password } = req.body;

//   Users.find({ email }).exec((err, user) => {
//     if (err)
//       return res.status(401).json({
//         error: `something went wrong"${err}`,
//       });

//     if (user)
//       return res.status(400).json({
//         error: "email already exist",
//       });

//     const token = jwt.sign(
//       { name, email, password },
//       process.env.JWT_ACCOUNT_ACTIVATION,
//       { expiresIn: "20m" }
//     );

//     const activationlink = `${process.env.CLIENT_URL}/traveller/account-activation/${token}`;

//     const emailData = {
//       to: [
//         {
//           address: email,
//           name,
//         },
//       ],
//       from: {
//         address: process.env.CLIENT_URL,
//         name: "Travel blogging",
//       },
//       subject: "Account activation link",
//       html: `
//       <div>
//       <h2> Follow the below link for account activation </h2>
//       <a href="${activationlink}" target= '_blank">${activationlink} </a>
//       </hr>
//       <p> This email contain sensitive enformation </p>
//       <a href="${process.env.CLIENT_URL}" target= '_blank">${process.env.CLIENT_URL} </a>
//       </div>`,
//     };

//     transport.sendMail(emailData, (err, info) => {
//       if (err)
//         return res.status(400).json({
//           error: `error in sending the mail of account activatipon ${err}`,
//         });
//       res.status.json({
//         mmessage: `Email has benn sent to address ${email}. follow the link in mail`,
//       });
//     });
//   });
// };
