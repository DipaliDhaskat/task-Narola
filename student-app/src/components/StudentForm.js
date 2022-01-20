import React, { useState } from 'react'
import { Grid, TextField, Button, Card, CardContent, Typography } from '@mui/material';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import standardData from '../model/StandardData.json';


export const StudentForm = () => {

    const [studetInfo, setStudentInfo] = useState([])
    const [flag, setFlag] = useState(0);
    const [currentStandard, setCurrentStandard] = useState("");
    const [remarks, setRemarks] = useState([])
    const [percentage, setPercentage] = useState([])
    const [error, setError] = useState({ name: "", rollNumber: "", email: "" })
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target
        setStudentInfo({
            ...studetInfo,
            [name]: value
        })
        e.target.name === "name" &&
            ((!(/^[a-zA-Z]*$/g.test(e.target.value))) ?
                setError({ name: "Please enter only alphabets" })
                : setError({ name: "" }))

        e.target.name === "rollNumber" &&
            ((!(/^[0-9]*$/g.test(e.target.value))) ?
                setError({ rollNumber: "Please enter only numbers" })
                : setError({ rollNumber: "" }))

        e.target.name === "email" && (
            ((!(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)))) ?
                setError({ email: "Please enter valid email address" })
                : setError({ email: "" }))
    }
    const onChangeCurrentStandard = (e) => {
        setCurrentStandard(e.target.value)
        setFlag(1)
    }
    const handleRemark = (e) => {
        const { name, value } = e.target
        setRemarks({
            ...remarks,
            [name]: value
        })
    }
    const handlePercentage = (e) => {
        const { name, value } = e.target

        if (e.target.value > 100) {
            console.log("its not valid")
        }
        setPercentage({
            ...percentage,
            [name]: value
        })


    }
    const handleSubmit = (event) => {
        event.preventDefault();
        !studetInfo?.name ? setError({ name: "required" })
            : !studetInfo.rollNumber ? setError({ rollNumber: "required" })
                : !studetInfo.email ? setError({ email: "required" })
                    : navigate("/studentDetails", { state: { currentStandard, remarks, percentage, studetInfo } });
    }

    return <div style={{ padding: "auto 5px", margin: "10px" }}>
        <Grid sx={{ my: 3 }} >
            <Card style={{ maxWidth: 450, padding: "10px 5px", margin: "0 auto" }}>
                <CardContent>
                    <Typography gutterBottom variant="h4" sx={{ mb: 3 }} align="center">
                        Student Registration
                    </Typography>

                    <form onSubmit={handleSubmit}>
                        <Grid container spacing={2}>
                            <Grid xs={12} item>
                                <TextField placeholder="Enter Name" name="name" label="Student Name" variant="outlined" onChange={handleChange}
                                    fullWidth required aria-required
                                    error={Boolean(error?.name)}
                                    helperText={(error?.name)}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField type="number" name="rollNumber" placeholder="Enter Roll number" label="Roll Number" variant="outlined"
                                    onChange={handleChange} fullWidth required aria-required
                                    error={Boolean(error?.rollNumber)}
                                    helperText={(error?.rollNumber)}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField type="email" name="email" placeholder="Enter email" label="Email" variant="outlined"
                                    onChange={handleChange} fullWidth required aria-required
                                    error={Boolean(error?.email)}
                                    helperText={(error?.email)}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <FormControl variant="outlined" sx={{ width: "-webkit-fill-available" }}>
                                    <InputLabel id="demo-simple-select-required-label">Current Standard</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-required-label"
                                        label="Current Standard*"
                                        id="demo-simple-select-required"
                                        name="currentStandard"
                                        value={currentStandard}
                                        onChange={onChangeCurrentStandard}
                                    >
                                        {
                                            standardData.standards.map(
                                                std => (<MenuItem key={std.id} value={std.id}>{std.name} Standard</MenuItem>)
                                            )
                                        }
                                    </Select>
                                </FormControl>
                            </Grid>

                            {
                                standardData.standards.map((std) => {
                                    return <div key={std.id}>
                                        {std.id < currentStandard && (
                                            <Grid container spacing={1} sx={{ my: 1 }} key={std.id}>
                                                <Grid item xs={4} sx={{ margin: "auto" }} >
                                                    <label>Standard  {std.name}</label>
                                                </Grid>
                                                <Grid item xs={4}>
                                                    <TextField type="text" name={std.name} placeholder="Remark" label="Remark" variant="outlined" onChange={handleRemark}
                                                        fullWidth required aria-required

                                                    />
                                                </Grid>
                                                <Grid item xs={4}>
                                                    <TextField type="number" name={std.name} placeholder="Percentage" label="Percentage" variant="outlined" onChange={handlePercentage} fullWidth
                                                        InputProps={{ inputProps: { min: 0, max: 100 } }}
                                                        required aria-required />
                                                </Grid>
                                            </Grid>
                                        )
                                        }
                                    </div>
                                })
                            }

                            <Grid item xs={12}>
                                <Button type="submit" variant="contained" color="primary" disabled={flag < 1}>Submit</Button>
                            </Grid>

                        </Grid>
                    </form>
                </CardContent>
            </Card>
        </Grid>
    </div>

}