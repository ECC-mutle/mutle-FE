import {
  ItemButton,
  TextBox,
  Title,
  Description,
  Arrow,
} from './SettingItem.style';

export default function SettingItem({
  title,
  description,
  isDanger = false,
  onClick,
}) {
  return (
    <ItemButton onClick={onClick}>
      <TextBox>
        <Title isDanger={isDanger}>{title}</Title>
        <Description>{description}</Description>
      </TextBox>
      <Arrow>›</Arrow>
    </ItemButton>
  );
}
