const forgot = async (req, res) => {
    const { email } = req.body;
    const user = await userModel.findByEmail(email);
    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }
    const token = await userModel.createToken(user._id);
    const link = `http://localhost:3000/reset-password/${token}`;
    const mailOptions = {
        from: "",
        to: email,
        subject: "Reset password",
        text: `Click on the link to reset your password: ${link}`,
    };
    await sendEmail(mailOptions);
    return res.status(200).json({ message: "Email sent" });
}

module.exports = {
    forgot,
};