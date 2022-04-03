import { shallow } from "enzyme";
import AddButton from "./AddButton";

const handleClick = jest.fn();
describe("Add Button Components", () => {
  const button = shallow(<AddButton onClick={handleClick} />);
  it("should be render add button child correctly", () => {
    expect(button.render().children()).toHaveLength(2);
  });

  it("should be render add button text correctly", () => {
    expect(button.find("div").text()).toEqual("Tambah");
  });

  it("mock click add button", () => {
    button.simulate("click");
    expect(handleClick).toHaveBeenCalled();
  });
});
