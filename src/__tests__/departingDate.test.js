const { isTripWithinWeek, isTripInThePast } = require("../client/js/app");

describe("isTripWithinWeek", () => {
  it("should return true if the trip is within a week", () => {
    const tripData = {
      date: new Date(Date.now() + 6 * 24 * 60 * 60 * 1000)
        .toISOString()
        .split("T")[0],
    }; // 6 days from now
    expect(isTripWithinWeek(tripData)).toBe(true);
  });

  it("should return false if the trip is more than a week away", () => {
    const tripData = {
      date: new Date(Date.now() + 8 * 24 * 60 * 60 * 1000)
        .toISOString()
        .split("T")[0],
    }; // 8 days from now
    expect(isTripWithinWeek(tripData)).toBe(false);
  });
});
