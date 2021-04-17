import {
  Input,
  InputNumber,
  Select,
  TreeSelect,
  AutoComplete,
  Cascader,
  Checkbox,
  DatePicker,
  TimePicker,
  Mentions,
  Radio,
  Rate,
  Slider,
  Switch,
  Upload,
} from 'antd';
import SortableList from './SortableList';

const formItems = {
  Input,
  TextArea: Input.TextArea,
  Search: Input.Search,
  Password: Input.Password,
  InputNumber,
  Select,
  TreeSelect,
  AutoComplete,
  Cascader,
  Checkbox: Checkbox.Group,
  DatePicker,
  RangePicker: DatePicker.RangePicker,
  TimePicker,
  Mentions,
  Radio: Radio.Group,
  Rate,
  Slider,
  Switch,
  Upload,
  SortableList,
};

export default formItems;
