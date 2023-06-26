import { Paper, TextField, Typography, Button, Tooltip } from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";
import React, { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import _ from "../@lodash";
import { yupResolver } from "@hookform/resolvers/yup";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import axios from "axios";
import * as yup from "yup";

const schema = yup.object().shape({
  email: yup
    .string()
    .required("Xanaları boş saxlamayın")
    .min(4, "minimum 4 simvol")
    .matches(
      /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
      "Email adresininzi doğru daxil edin"
    ),
  phone: yup
    .string()
    .required("Xanaları boş saxlamayın")
    .matches(
      /^((\+)?994(\s)?)?(5[015]|7[07]|99|10|60)(\s)?([0-9]{3})(\s)?([0-9]{2})(\s)?([0-9]{2})$/,
      "Mobil nömrənizi düz qeyd edin !"
    ),
});

const defaultValues = {
  email: "",
  phone: "",
};

const Form = () => {
  const { control, formState, handleSubmit, setError, setValue, reset } =
    useForm({
      mode: "onChange",
      defaultValues,
      resolver: yupResolver(schema),
    });

  // useEffect(() => {
  //   setValue("email", "example@mail.com", {
  //     shouldDirty: true,
  //     shouldValidate: true,
  //   });
  //   setValue("phone", "997775544", { shouldDirty: true, shouldValidate: true });
  // }, [setValue]);

  const onSubmit = ({ email, phone }) => {
    axios
      .post("https://jsonplaceholder.typicode.com/todos", {
        email,
        phone: "+994" + phone,
      })
      .then((res) => {
        reset();
      });
  };

  const { isValid, dirtyFields, errors } = formState;
  return (
    <div className="h-screen  bg-cyan-700 flex justify-center items-center">
      <Paper className="h-[500px] w-[400px] flex flex-col  items-center">
        <div className=" mt-12">
          <Typography>Sign in</Typography>
        </div>
        <form
          name="loginForm"
          noValidate
          className="mt-12"
          onSubmit={handleSubmit(onSubmit)}
        >
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                className="mb-24"
                label="Email"
                autoFocus
                type="email"
                error={!!errors.email}
                helperText={errors?.email?.message}
                variant="outlined"
                required
                fullWidth
              />
            )}
          />
          <div className="mt-12">
            <Controller
              name="phone"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  className="mb-24"
                  label="Phone"
                  autoFocus
                  variant="outlined"
                  type="tel"
                  error={!!errors.phone}
                  helperText={errors?.phone?.message}
                  required
                  fullWidth
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">+994</InputAdornment>
                    ),
                  }}
                  onInput={(e) => {
                    // eslint-disable-next-line eqeqeq

                    if (e.target.value.length == 0) {
                      e.target.value = "";
                    } else if (isNaN(e.target.value)) {
                      e.target.value = "";
                    } else {
                      e.target.value = Math.max(0, e.target.value)
                        .toString()
                        .slice(0, 9);
                    }
                  }}
                />
              )}
            />
          </div>

          <div className=" mt-10">
            <Tooltip title="Bize yaz" placement="top">
              <a
                href="//api.whatsapp.com/send?phone=994111111111&text=This is a test message"
                style={{ color: "#00a884", marginLeft: "128px" }}
              >
                <WhatsAppIcon style={{ fontsize: "40px", color: "green" }} />
              </a>
            </Tooltip>
          </div>

          <div className=" mt-8">
            <Button
              variant="contained"
              color="primary"
              className=" w-full mt-16"
              aria-label="Sign in"
              type="submit"
              size="large"
              disabled={_.isEmpty(dirtyFields) || !isValid}
            >
              Sign in
            </Button>
          </div>
        </form>
      </Paper>
    </div>
  );
};

export default Form;
