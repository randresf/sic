export default function ShouldRender(props: { if: any; children: any }) {
  return props.if ? props.children : null
}
