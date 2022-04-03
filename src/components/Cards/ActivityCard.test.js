import { shallow } from "enzyme";
import ActivityCard from "./ActivityCard";
import dayjs from "dayjs";

const mockDateTesting = new Date().toISOString();
const mockDataDummy = { title: "My Activity", created_at: mockDateTesting };
const mockOnClickCard = jest.fn();
const mockOnDelete = jest.fn();

describe("Activity Card Components", () => {
  const card = shallow(
    <ActivityCard
      data={mockDataDummy}
      onDelete={mockOnDelete}
      onClick={mockOnClickCard}
    />
  );

  it("should be render card activity", () => {
    expect(card.render().children()).toHaveLength(2);
  });

  describe("Activity Card Body Component", () => {
    const cardBody = card.find(".activity-card-todo__body");
    it("click card body", () => {
      cardBody.simulate("click");
      expect(mockOnClickCard).toHaveBeenCalled();
    });

    it("render card body title", () => {
      expect(cardBody.find(".activity-card-todo__title").text()).toEqual(
        "My Activity"
      );
    });
  });

  describe("Activity Card Action Component", () => {
    const cardAction = card.find(".activity-card-todo__action");
    it("render card body action", () => {
      expect(cardAction.find(".activity-card-todo__date").text()).toEqual(
        dayjs(mockDateTesting).locale("id").format("DD MMMM YYYY")
      );
    });

    it("click delete button action", () => {
      cardAction
        .find('[data-cy="activity-item-delete-button"]')
        .simulate("click");

      expect(mockOnDelete).toHaveBeenCalled();
    });
  });
});
