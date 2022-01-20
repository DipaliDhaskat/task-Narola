import { useEffect } from 'react'
import { useLocation, useNavigate } from "react-router-dom";
import { Table, TableCell, TableHead, TableRow, TableBody } from '@mui/material';
import { Card, CardContent, Typography, CardMedia } from '@mui/material';

import Swal from 'sweetalert2'
import standardData from '../model/StandardData.json';

export const StudentDetails = () => {
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        location.state === null && navigate("/");
        location.state !== null && Swal.fire({
            icon: 'success',
            title: `${location.state?.studetInfo?.name} is successfully register`,
            html:
                `Roll Number is <b> ${location.state?.studetInfo?.rollNumber}</b> <br />` +
                `Email Id is  <b> ${location.state?.studetInfo?.email}</b> `,

            showConfirmButton: true,
        })
        console.log(location.state.percentage[`1st%`])
    }, [location.state])
    return <div style={{ padding: "auto 5px", marginTop: "60px" }}>

        <Card style={{ maxWidth: 450, padding: "10px 5px", margin: "0 auto" }}>
            <CardContent>
                <Typography gutterBottom variant="h4" sx={{ mb: 3 }} align="center">
                    Student Details
                </Typography>

                {location.state?.currentStandard > 1 && <Table sx={{ maxWidth: 500, margin: "auto" }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Standard  </TableCell>
                            <TableCell >Remark</TableCell>
                            <TableCell >Percentage </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {standardData.standards?.map((std) => {
                            return std.id < location.state?.currentStandard
                                && <TableRow key={std.id}>
                                    <TableCell> {std.name}  </TableCell>
                                    <TableCell > {location.state.remarks[std.name]}</TableCell>
                                    <TableCell >{location.state.percentage[std.name]}% </TableCell>
                                </TableRow>
                        })
                        }
                    </TableBody>
                </Table>
                }
                {
                    location.state?.currentStandard === 1 && <h4>Student is in 1st standard so no data found</h4>
                }
            </CardContent>
        </Card>
    </div>
}