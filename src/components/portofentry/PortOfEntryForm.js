import React, { useState, useEffect, useRef } from "react";
import {
  Box,
  Grid,
  Typography,
  Paper,
  AppBar,
  Toolbar,
  IconButton,
  Button,
  Slide,
  Switch,
  Dialog,
  List,
  ListItem,
  ListItemSecondaryAction,
  makeStyles
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import { isEmpty, cloneDeep } from "lodash";
import { green, red, grey, teal, amber } from "@material-ui/core/colors";
import DependantsForm from '../dependents/DependentsForm';
import { renderField } from "../form/form-util";
import {
  nameValidator,
  ageValidator,
  emailValidator,
} from "../../validation/form/portOfEntry";

const HOTEL_KEYS = ["skylight", "ghion", "azzeman", "sapphire", "other"];


const underlying = [
  "chronicLungDisease",
  "heartDisease",
  "liverDisease",
  "renalDisease",
  "autoimmuneDisease",
  "cancer",
  "diabetes",
  "hiv",
  "pregnancy",
]


const useStyles = makeStyles((theme) => ({
  appBar: {
    position: 'relative',
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});


const SEX_VALUE = {
  property: "gender",
  female: "F",
  male: "M",
};

const PortOfEntryForm = ({ onSubmit, lang }) => {
  const [formValues, setFormValues] = useState({
    [SEX_VALUE.property]: SEX_VALUE.female,
  });

  const [open, setOpen] = useState(false);
  const [clear, setClear] = useState(0);

  const handleFieldChange = (field) => (value) => {

    console.log(field, ": ", value);
    if (underlying.includes(field)) {
      setFormValues({
        ...formValues,
        underlyingConditions: {
           ...formValues.underlyingConditions,
           [field] : value
        },
      });

    } else {
      setFormValues({
        ...formValues,
       [field]: value,
      });
    }
  };

  const fields = [
    {
      type: "text",
      label: lang.t("firstName"),
      property: "firstName",
      focus: true,
      onChange: handleFieldChange("firstName"),
      onValidate: nameValidator.validate,
      validationErrorMsg: lang.t(nameValidator.validationErrorMsg),
    },
    {
      type: "text",
      label: lang.t("middleName"),
      property: "middleName",
      onChange: handleFieldChange("middleName"),
      onValidate: nameValidator.validate,
      validationErrorMsg: lang.t(nameValidator.validationErrorMsg),
    },
    {
      type: "text",
      label: lang.t("lastName"),
      property: "lastName",
      onChange: handleFieldChange("lastName"),
      onValidate: nameValidator.validate,
      validationErrorMsg: lang.t(nameValidator.validationErrorMsg),
    },
    {
      type: "text",
      label: lang.t("email"),
      property: "email",
      onChange: handleFieldChange("email"),
      onValidate: emailValidator.validate,
      validationErrorMsg: lang.t(emailValidator.validationErrorMsg),
    },
    {
      type: "text",
      label: lang.t("age"),
      property: "age",
      onChange: handleFieldChange("age"),
      onValidate: ageValidator.validate,
      validationErrorMsg: lang.t(ageValidator.validationErrorMsg),
    },
    {
      type: "select",
      label: lang.t("sex.label"),
      property: SEX_VALUE.property,
      onChange: handleFieldChange(SEX_VALUE.property),
      choices: [
        { label: lang.t("sex.female"), value: SEX_VALUE.female },
        { label: lang.t("sex.male"), value: SEX_VALUE.male },
      ],
    },
    {
      type: "select",
      label: lang.t("nationality.label"),
      property: "nationality",
      onChange: handleFieldChange("nationality"),
      choices: [
        { label: lang.t("nationality.ethiopian"), value: "ET" }, //placeholder
        { label: lang.t("nationality.other"), value: "other" },
      ],
    },
    {
      type: "text",
      label: lang.t("passportNumber"),
      property: "passportNo",
      onChange: handleFieldChange("passportNo"),
    },
    {
      type: "text",
      label: lang.t("phoneNumber"),
      property: "phoneNumber",
      onChange: handleFieldChange("phoneNumber"),
    },
    {
      type: "select",
      label: lang.t("travelFrom"),
      property: "travelFrom",
      onChange: handleFieldChange("travelFrom"),
      choices: [
        { label: "country 1", value: "1" }, //placeholder
        { label: "country 2", value: "2" },
      ],
    },
    {
      type: "select",
      label: lang.t("transitFrom"),
      property: "transitFrom",
      onChange: handleFieldChange("transitFrom"),
      choices: [
        { label: "country 1", value: "1" }, //placeholder
        { label: "country 2", value: "2" },
      ],
    },
    {
      type: "select",
      label: lang.t("hotel.label"),
      property: "hotelName",
      onChange: handleFieldChange("hotelName"),
      choices: HOTEL_KEYS.map((r) => ({
        label: lang.t(`hotel.${r}`),
        value: r,
      })),
    },
    {
      type: "text",
      label: lang.t("seatNumber"),
      property: "seatNumber",
      onChange: handleFieldChange("seatNumber"),
    },
    {
      type: "text",
      label: lang.t("flightNumber"),
      property: "flightNumber",
      onChange: handleFieldChange("flightNumber"),
    },

    {
      type: "check",
      label: lang.t("chronicLungDisease"),
      property: "chronicLungDisease",
      onChange: handleFieldChange("chronicLungDisease"),
    },
    {
      type: "check",
      label: lang.t("fever"),
      property: "fever",
      onChange: handleFieldChange("fever"),
    },
    {

      type: 'check',
      label: lang.t('fatigue'),
      property: 'fatigue',
      onChange: handleFieldChange('fatigue')
    },
    {
      type: 'check',
      label: lang.t('cough'),
      property: 'cough',
      onChange: handleFieldChange('cough')
    },
    {
      type: 'check',
      label: lang.t('shortnessOfBreath'),
      property: 'shortnessOfBreath',
      onChange: handleFieldChange('shortnessOfBreath')
    },
    {
      type: "check",
      label: lang.t("heartDisease"),
      property: "heartDisease",
      onChange: handleFieldChange("heartDisease"),
    },

    {
      type: "check",
      label: lang.t("liverDisease"),
      property: "liverDisease",
      onChange: handleFieldChange("liverDisease"),
    },
    {
      type: "check",
      label: lang.t("renalDisease"),
      property: "renalDisease",
      onChange: handleFieldChange("renalDisease"),
    },

    {
      type: "check",
      label: lang.t("autoimmuneDisease"),
      property: "autoimmuneDisease",
      onChange: handleFieldChange("autoimmuneDisease"),
    },

    {
      type: "check",
      label: lang.t("cancer"),
      property: "cancer",
      onChange: handleFieldChange("cancer"),
    },

    {
      type: "check",
      label: lang.t("diabetes"),
      property: "diabetes",
      onChange: handleFieldChange("diabetes"),
    },


    {
      type: "check",
      label: lang.t("hiv"),
      property: "hiv",
      onChange: handleFieldChange("hiv"),
    },

    {
      type: "check",
      label: lang.t("pregnancy"),
      property: "pregnancy",
      onChange: handleFieldChange("pregnancy"),
      type: "check",
      label: lang.t("cough"),
      property: "cough",
      onChange: handleFieldChange("cough"),
    },
    {
      type: "check",
      label: lang.t("shortnessOfBreath"),
      property: "shortnessOfBreath",
      onChange: handleFieldChange("shortnessOfBreath"),
    },
  ];

  const renderFormField = (property) => {
    const field = fields.find((f) => f.property === property);
    if (!field) {
      return null;
    }
    return renderField(field, clear);
  };

  const renderSectionHeader = (label) => {
    return (
      <Typography className="sectionheader" variant="h2">{label}</Typography>
    );
  };

  const renderSubsectionheader = (label) => {
    return (
        <Typography className="subsectionheader" variant="h5">{label}</Typography>
    );
  };

  const handleSubmit = () => {
    onSubmit(formValues)
      .then(() => {
        // clear form values
        setFormValues({})
        setClear(clear + 1);
      })
  };

  const handleModal = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const isFormValid = () => {
    let isValid = true;
    fields.forEach((f) => {
      if (f.onValidate) {
        isValid = isValid && f.onValidate(formValues[f.property]);
      }
    });
    return isValid;
  };

  const handleDependentsAdd = (dependent) => {
    setOpen(false);
    const dependents = formValues.dependents || [];
    dependents.push(dependent);
    setFormValues({
      ...formValues,
      dependents
    })
  }

  const renderForm = () => {
    return (
      <form autoComplete="off">
        {renderSectionHeader("Passenger Registration Form")}
        {renderSubsectionheader("Basic Information")}
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            {renderFormField("firstName")}
          </Grid>
          <Grid item xs={12} md={4}>
            {renderFormField("middleName")}
          </Grid>
          <Grid item xs={12} md={4}>
            {renderFormField("lastName")}
          </Grid>
          <Grid item xs={12} md={4}>
            {renderFormField("gender")}
          </Grid>
          <Grid item xs={12} md={4}>
            {renderFormField("nationality")}
          </Grid>
          <Grid item xs={12} md={4}>
            {renderFormField("passportNo")}
          </Grid>
          <Grid item xs={12} md={4}>
            {renderFormField("phoneNumber")}
          </Grid>
          <Grid item xs={12} md={4}>
            {renderFormField("age")}
          </Grid>
          <Grid item xs={12} md={4}>
            {renderFormField("email")}
          </Grid>
        </Grid>

        {renderSubsectionheader("Travel Info")}
        <Grid container spacing={4}>
          <Grid item xs={12} md={3}>
            {renderFormField("travelFrom")}
          </Grid>
          <Grid item xs={12} md={3}>
            {renderFormField("transitFrom")}
          </Grid>
          <Grid item xs={12} md={3}>
            {renderFormField("flightNumber")}
          </Grid>
          <Grid item xs={12} md={3}>
            {renderFormField("seatNumber")}
          </Grid>
          <Grid item xs={12} md={3}>
            {renderFormField("hotelName")}
          </Grid>
        </Grid>

        <Grid container spacing={4}>
          <Grid item xs={12} sm={6}>
            {renderSubsectionheader("Symptoms")}
            {renderFormField("fever")}
            {renderFormField("cough")}
            {renderFormField("shortnessOfBreath")}
            {renderFormField("fatigue")}
          </Grid>
          <Grid item xs={12} sm={6}>
            {renderSubsectionheader(lang.t("underlyingConditions"))}
            {renderFormField("chronicLungDisease")}
            {renderFormField("heartDisease")}
            {renderFormField("liverDisease")}
            {renderFormField("renalDisease")}
            {renderFormField("autoimmuneDisease")}
            {renderFormField("cancer")}
            {renderFormField("diabetes")}
            {renderFormField("hiv")}
            {renderFormField("pregnancy")}
          </Grid>
        </Grid>
        <Box mt={4} textAlign="left">
          {renderSubsectionheader('Dependents')}
          <Button onClick={handleModal} variant="outlined" size="large">{lang.t('addDependent')}</Button>
          {!isEmpty(formValues.dependents) && (
            <Grid container item xs={12} md={4}>
              <List style={{ width: '100%' }}>
                {formValues.dependents.map((d, index) => {
                  const onRemoveDependent = () => {
                    const dependents = formValues.dependents.filter((d, i) => i !== index);
                    setFormValues({
                      ...formValues,
                      dependents
                    })
                  }

                  return (
                    <ListItem>
                      <Typography>{`${index + 1}. ${d.firstName} ${d.lastName}`}</Typography>
                      <ListItemSecondaryAction>
                        <Button onClick={onRemoveDependent}>Remove</Button>
                      </ListItemSecondaryAction>
                    </ListItem>
                  )
                })}
              </List>
            </Grid>
          )}

          <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
            <AppBar style={{ background: 'blue' }}>
              <Toolbar>
                <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
                  <CloseIcon />
                </IconButton>
                <Typography>
                  Passenger Dependents Registration Form
                </Typography>
              </Toolbar>
            </AppBar>
            <Paper style={{ margin: 30, padding: 30 }}>
              <DependantsForm onSubmit={handleDependentsAdd} lang={lang} />
            </Paper>
          </Dialog>
        </Box>


        <Box mt={4} textAlign="right">
          <Button
            onClick={handleSubmit}
            variant="contained"
            size="large"
            disabled={!isFormValid()}
          >
            {lang.t("submit")}
          </Button>
        </Box>
      </form>
    );
  };

  return <Box>{renderForm()}</Box>;
};

export default PortOfEntryForm;
