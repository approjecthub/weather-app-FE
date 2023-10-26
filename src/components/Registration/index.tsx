import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { showErrorMessage, showSuccessMessage } from "../../helper";
import { useNavigate } from "react-router-dom";

const Registration: React.FC = () => {
  const navigate = useNavigate();
  const initialValues = {
    dateOfBirth: "",
    email: "",
    password: "",
  };

  const validationSchema = Yup.object().shape({
    dateOfBirth: Yup.date().required("Date of Birth is required"),
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
      url: `${process.env.REACT_APP_BE_URL}/user/register`,
      headers: {
        Authorization: "",
        "Content-Type": "application/json",
      },
      data: JSON.stringify(values),
    };
    try {
      await axios.request(config);
      showSuccessMessage("Successfully registered");
      resetForm();
      navigate("/login");
    } catch (err: any) {
      showErrorMessage(
        `Error in registration: ${err?.response?.data?.error || err.message}`
      );
    }
  };

  return (
    <div className="container h-100 w-100">
      <h2 className="text-center">Registration Form</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, isValid }) => (
          <Form className="d-flex flex-column justify-content-center align-items-center mt-5">
            <div className="mb-3 w-100">
              <label htmlFor="dateOfBirth" className="form-label">
                Date of Birth
              </label>
              <Field
                type="date"
                id="dateOfBirth"
                name="dateOfBirth"
                className="form-control"
              />
              <ErrorMessage
                name="dateOfBirth"
                component="div"
                className="text-danger"
              />
            </div>

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
              {isSubmitting ? "Registering..." : "Register"}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Registration;
