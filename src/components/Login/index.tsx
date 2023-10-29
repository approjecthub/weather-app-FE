import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import {
  showErrorMessage,
  showSuccessMessage,
} from "../../helper/toastMessage";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../AuthContext";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const { isAuthenticated, setAuthToken } = useContext(AuthContext);
  if (isAuthenticated) {
    navigate("/");
  }

  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });

  const handleSubmit = async (
    values: typeof initialValues,
    { resetForm }: { resetForm: () => void }
  ) => {
    const config = {
      method: "POST",
      maxBodyLength: Infinity,
      url: `${process.env.REACT_APP_BE_URL}/user/login`,
      headers: {
        Authorization: "",
        "Content-Type": "application/json",
      },
      data: JSON.stringify(values),
    };
    try {
      const response = await axios.request(config);
      setAuthToken(response.data?.token);
      showSuccessMessage("Successfully loggedin");
      resetForm();
      navigate("/");
    } catch (err: any) {
      showErrorMessage(
        `Error in login: ${err?.response?.data?.error || err.message}`
      );
    }
  };

  return (
    <div className="container h-100 w-100 d-flex flex-column justify-content-center">
      <h2 className="text-center">Login</h2>
      <button
        className="btn btn-link"
        onClick={() => {
          navigate("/registration");
        }}
      >
        New User, Click here
      </button>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, isValid }) => (
          <Form className="d-flex flex-column justify-content-center align-items-center mt-5">
            <div className="mb-3 w-100">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <Field
                type="email"
                id="email"
                name="email"
                className="form-control"
              />
              <ErrorMessage
                name="email"
                component="div"
                className="text-danger"
              />
            </div>

            <div className="mb-3 w-100">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <Field
                type="password"
                id="password"
                name="password"
                className="form-control"
              />
              <ErrorMessage
                name="password"
                component="div"
                className="text-danger"
              />
            </div>

            <button
              type="submit"
              className="btn btn-primary"
              disabled={isSubmitting || !isValid}
            >
              {isSubmitting ? "Logging in..." : "Login"}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Login;
