const express = require("express");
const app = express();
app.use(express.json());
require("dotenv").config();
const cors = require("cors");
const client = require("./utils/clients");
app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);
const { ApiError } = require("./utils/ApiError");
const { ApiResponse } = require("./utils/ApiResponse");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
app.post("/store", async (req, res) => {
  try {
    const { username, language, stdInput, sourceCode, timestamp } = req.body;
    if (username == "" || language == "" || sourceCode == "") {
      throw new ApiError(400, "All the fields Are Necessary");
    }
    const data = await prisma.user.create({
      data: {
        username,
        language,
        stdInput: stdInput,
        sourceCode,
        createdAt: timestamp,
      },
    });
    res
      .status(200)
      .json(new ApiResponse(200, data, "Entry Created Successfully"));
  } catch (error) {
    console.log(error);
    res
      .status(error.statusCode)
      .json(new ApiResponse(error.statusCode, null, error.error_message));
  }
});

app.get("/getinfo", async (req, res) => {
  try {
    const cacheValue = await client.get("info");
    if (cacheValue) {
      return res
        .status(200)
        .json(
          new ApiResponse(
            200,
            JSON.parse(cacheValue),
            "Data fetched from cache successfully"
          )
        );
    }
    const data = await prisma.user.findMany();
    await client.set("info", JSON.stringify(data));
    await client.expire("info", 30);

    if (!data) {
      throw new ApiError(400, "Something Went Wrong While fetching");
    }

    return res
      .status(200)
      .json(
        new ApiResponse(200, data, "Data fetched from database successfully")
      );
  } catch (error) {
    console.error(error);
    return res
      .status(error.statusCode)
      .json(
        new ApiResponse(
          error.statusCode,
          null,
          error.error_message || "Internal Server Error"
        )
      );
  }
});

app.get("/getSourceCode/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const getSourceCode = await prisma.user.findFirst({
      where: { id: userId },
    });
    if (!getSourceCode) {
      throw new ApiError(400, "Something Went Wrong While fetching SourceCode");
    }
    res
      .status(200)
      .json(
        new ApiResponse(200, getSourceCode, "Source Code fetched Successfully")
      );
  } catch (error) {
    console.log(error);
    res
      .status(error.statusCode)
      .json(new ApiResponse(error.statusCode, null, error.error_message));
  }
});
app.delete("/delete", async (req, res) => {
  try {
    const data = await prisma.user.deleteMany();

    res
      .status(200)
      .json(new ApiResponse(200, null, "Data deleted Successfully"));
  } catch (error) {
    res
      .status(error.statusCode)
      .json(new ApiResponse(error.statusCode, null, error.error_message));
  }
});
app.listen(process.env.PORT, () => {
  console.log(`Running on Port ${process.env.PORT}`);
});
