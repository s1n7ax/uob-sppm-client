import {
  Button,
  Checkbox,
  FormControl,
  FormHelperText,
  Input,
  InputLabel,
  ListItemText,
  makeStyles,
  MenuItem,
  Select,
  TextField,
} from '@material-ui/core';
import { useEffect, useState } from 'react';
import {
  updateCustomerAppointment,
  createCustomerAppointment,
} from '../api/organization';
import { useEVValueState } from '../hooks/useEVValueState';
import { useCustomerAppointmentStore } from '../store/CustomerAppointmentStore';
import DialogWindow from './DialogWindow';
import isFuture from 'date-fns/isFuture';
import setHours from 'date-fns/setHours';
import isWeekend from 'date-fns/isWeekend';
import isWithinInterval from 'date-fns/isWithinInterval';
import isValid from 'date-fns/isValid';
import format from 'date-fns/format';
import addDays from 'date-fns/addDays';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 500,
  },
  formControlSingle: {
    margin: theme.spacing(1),
    minWidth: 250,
    marginRight: 50,
  },
}));

const CustomerAppointmentDialog = ({
  edit,
  appointment,
  branchList,
  serviceList,
  packageList,
  ...args
}) => {
  if (edit && !appointment)
    throw new Error('Edit window require customerAppointment details');

  appointment =
    appointment ||
    getCustomerAppointmentJson(branchList, serviceList, packageList);

  const customerAppointmentStore = useCustomerAppointmentStore();

  const [branchId, setBranchId] = useEVValueState(appointment.branch.id);
  const [serviceIds, setServiceIds] = useEVValueState(
    appointment.services.map((service) => service.id)
  );
  const [packageIds, setPackageIds] = useEVValueState(
    appointment.packages.map((pkg) => pkg.id)
  );
  const [timeStart, setTimeStart] = useEVValueState(
    encodeDate(appointment.timeStart)
  );

  const classes = useStyles();

  const [errors, setErrors] = useState({
    timeStart: {},
    serviceIds: {},
    packageIds: {},
  });

  useEffect(() => {
    setErrors({
      timeStart: validateTimeStart(timeStart),
      serviceIds: validateServicesAndPackages(serviceIds, packageIds),
      packageIds: validateServicesAndPackages(serviceIds, packageIds),
    });
  }, [packageIds, serviceIds, timeStart]);

  const hasErrors = () => {
    return Object.entries(errors).some(([_key, value]) => value.error);
  };

  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };

  const handleSave = () => {
    const branch = branchList.find((branch) => branch.id === branchId);

    const services = serviceIds.map((id) =>
      serviceList.find((service) => service.id === id)
    );

    const packages = packageIds.map((id) =>
      packageList.find((pkg) => pkg.id === id)
    );

    (async () => {
      const newCustomerAppointment = {
        ...appointment,
        branch,
        services,
        packages,
        timeStart: new Date(timeStart),
      };

      edit
        ? await updateCustomerAppointment(newCustomerAppointment)
        : await createCustomerAppointment(newCustomerAppointment);
      await customerAppointmentStore.refreshData();
      args.closeWindow();
    })();
  };

  const ActionBar = () => {
    return (
      <Button disabled={hasErrors()} onClick={handleSave} color="primary">
        Save changes
      </Button>
    );
  };

  return (
    <DialogWindow
      ActionBar={ActionBar}
      title="Edit Customer Appointment"
      {...args}
    >
      <form className={classes.root} noValidate autoComplete="off">
        <FormControl className={classes.formControl}>
          <InputLabel>Branch</InputLabel>
          <Select value={branchId} onChange={setBranchId}>
            {branchList.map((branch) => (
              <MenuItem key={branch.id} value={branch.id}>
                {branch.location}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl
          className={classes.formControl}
          error={errors.packageIds.error}
        >
          <InputLabel>Services</InputLabel>
          <Select
            multiple
            value={serviceIds}
            onChange={setServiceIds}
            input={<Input />}
            renderValue={(selected) =>
              selected
                .map(
                  (id) => serviceList.find((service) => service.id === id).name
                )
                .join(', ')
            }
            MenuProps={MenuProps}
          >
            {serviceList.map((service) => (
              <MenuItem key={service.id} value={service.id}>
                <Checkbox checked={serviceIds.indexOf(service.id) > -1} />
                <ListItemText primary={service.name} />
              </MenuItem>
            ))}
          </Select>
          <FormHelperText>{errors.serviceIds.helpText}</FormHelperText>
        </FormControl>

        <FormControl
          className={classes.formControl}
          error={errors.packageIds.error}
        >
          <InputLabel>Packages</InputLabel>
          <Select
            multiple
            value={packageIds}
            onChange={setPackageIds}
            input={<Input />}
            renderValue={(selected) => {
              return selected
                .map((id) => packageList.find((pkg) => pkg.id === id).name)
                .join(', ');
            }}
            MenuProps={MenuProps}
          >
            {packageList.map((pkg) => (
              <MenuItem key={pkg.id} value={pkg.id}>
                <Checkbox checked={packageIds.indexOf(pkg.id) > -1} />
                <ListItemText primary={pkg.name} />
              </MenuItem>
            ))}
          </Select>
          <FormHelperText>{errors.packageIds.helpText}</FormHelperText>
        </FormControl>

        <FormControl
          className={classes.formControl}
          error={errors.timeStart.error}
        >
          <TextField
            label="Time"
            type="datetime-local"
            defaultValue={timeStart}
            onChange={setTimeStart}
            className={classes.textField}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <FormHelperText>{errors.timeStart.helpText}</FormHelperText>
        </FormControl>
      </form>
    </DialogWindow>
  );
};

const getCustomerAppointmentJson = (branchList, serviceList, packageList) => {
  return {
    id: 0,
    customer: {
      id: 0,
      user: {
        id: 0,
        roles: [
          {
            id: 0,
            name: 'CUSTOMER',
            createdDate: null,
          },
        ],
        username: '',
        firstName: '',
        lastName: '',
        active: true,
        lastLogin: new Date(),
        createdDate: null,
      },
      createdDate: null,
    },
    branch: branchList[0],
    services: [],
    packages: [],
    timeStart: addDays(new Date(), 1),
    timeEnd: new Date(),
    completed: false,
    active: true,
    createdDate: new Date(),
  };
};

const validateTimeStart = (timeStart) => {
  let error = false;
  let helpText = '';

  const date = new Date(timeStart);

  if (!isValid(date)) {
    error = true;
    helpText = 'Invalid date format';
  } else if (!isFuture(date)) {
    error = true;
    helpText = 'Date should be future date';
  } else if (!isWithinOpenHours(date)) {
    error = true;
    helpText = 'Date should be within opening days and hours';
  }

  return { error, helpText };
};

const isWithinOpenHours = (date) => {
  if (isWeekend(date)) return false;

  const open = setHours(date, 9);
  const close = setHours(date, 17);

  return isWithinInterval(date, { start: open, end: close });
};

const validateServicesAndPackages = (services, packages) => {
  if (services.length === 0 && packages.length === 0) {
    return {
      error: true,
      helpText: 'At least one service or package should be selected',
    };
  }

  return { error: false, helpText: '' };
};

const encodeDate = (date) => {
  return format(new Date(date), "yyyy-MM-dd'T'HH:mm");
};

export default CustomerAppointmentDialog;
