export const HealthController = {
  check: (req, res) => {
    res.status(200).json({ status: "ok" });
  }
};
