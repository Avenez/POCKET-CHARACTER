import Badge from "react-bootstrap/Badge";
import { useDispatch } from "react-redux";
import { incrementDice } from "../../REDUX/DicesSlice";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";

const GeneralDice = (props) => {
  const dispatch = useDispatch();
  const svgCode = props.svg;
  // const dice = props.diceName;

  // ------REACT BOOTSTRAP TOOLTIP
  const renderTooltip = (props) => (
    <Tooltip id="button-tooltip" style={{ position: "fixed" }}>
      {props}
    </Tooltip>
  );
  // -----------------------------

  return (
    <OverlayTrigger
      className="m-0"
      placement="right"
      delay={{ show: 250, hide: 250 }}
      overlay={renderTooltip(props.diceName)}
    >
      <div className="DicesBox">
        <Badge bg="danger" className="DiceBadge">
          {props.open === true && props.counter !== 0 ? props.counter : ""}
        </Badge>

        <div
          dangerouslySetInnerHTML={{ __html: svgCode }}
          className="Dices"
          onClick={() => dispatch(incrementDice(props.diceId))}
        />
      </div>
    </OverlayTrigger>
  );
};

export default GeneralDice;
