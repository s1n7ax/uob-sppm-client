function CenterLayout({ children, direction }) {
  direction = direction || 'column';

  let styles = {
    width: '100%',
    height: '100%',

    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: direction,
  };

  return <div style={styles}>{children}</div>;
}

export default CenterLayout;
