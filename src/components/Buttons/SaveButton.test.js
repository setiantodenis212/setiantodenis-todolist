import { shallow } from "enzyme";
import SaveButton from "./SaveButton";

const handleClick = jest.fn();
describe("Save Button Components", () => {
  const button = shallow(<SaveButton onClick={handleClick} />);
  it("should be render save button child correctly", () => {
    expect(button.render().children()).toHaveLength(1);
  });

  it("should be render save button text correctly", () => {
    expect(button.find("div").text()).toEqual("Simpan");
  });

  it("mock click save button", () => {
    button.simulate("click");
    expect(handleClick).toHaveBeenCalled();
  });
});
