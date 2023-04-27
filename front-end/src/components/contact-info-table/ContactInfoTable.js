import React, { useMemo, useState } from "react";
import MaterialReactTable from "material-react-table";
import { Box, Typography } from "@mui/material";
import "./ContactInfoTable.css";
import useFetch from "use-http";

const ContactInfoTable = () => {
  const { get, post, response, loading, error } = useFetch(
    "https://calm-anchorage-89848.herokuapp.com/api"
  );
  const [tableData, setTableData] = useState([]);
  const [openTable, setOpenTable] = useState(false);

  const onSubmit = async () => {
    setOpenTable(true);
    const responseData = await get("/getAllContactInfo");
    if (response.ok) {
      setTableData(responseData);
    }
  };

  const columns = useMemo(
    () => [
      {
        accessorKey: "fullName",
        header: "Full Name",
      },
      {
        accessorKey: "email",
        header: "Email Id",
      },
      {
        accessorKey: "phone",
        header: "Contact number",
      },
      {
        accessorKey: "question",
        header: "Question",
      },
      {
        accessorKey: "date",
        header: "Date",
      },
    ],
    []
  );

  return (
    <div>
      <button
        type="submit"
        className="btn btn-primary mb-4"
        onClick={() => onSubmit()}
      >
        Get Report
      </button>

      {openTable ? (
        <MaterialReactTable
          columns={columns}
          data={tableData}
          renderDetailPanel={({ row }) => (
            <Box
              sx={{
                display: "grid",
                margin: "auto",
                gridTemplateColumns: "1fr 1fr",
                width: "100%",
              }}
            >
              <Typography>Question: {row.original.question}</Typography>
            </Box>
          )}
        />
      ) : (
        ""
      )}
    </div>
  );
};

export default ContactInfoTable;
