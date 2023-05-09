import { StyleSheet } from "react-native";
import { COLORS, SHADOWS, SIZES } from "../../constants";

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    overflow: 'hidden',
    backgroundColor: 'transparent',
    borderTopWidth: 0,
    borderTopColor: '#ccc',
    paddingHorizontal: 15,
    paddingBottom: Platform.OS === 'ios' ? 20 : 0,
  },
  btn: (name, activeTab) => ({
    flex: 1,
    paddingVertical: SIZES.medium,
    paddingHorizontal: SIZES.small,
    marginHorizontal: 2.5,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: name === activeTab ? COLORS.tertiary : "#F3F4F8",
    borderRadius: SIZES.large,
    ...SHADOWS.large,
    shadowColor: COLORS.gray,
  }),
  btnText: (name, activeTab) => ({
    fontFamily: "DMMedium",
    fontSize: SIZES.small,
    color: name === activeTab ? "#FFFFFF" : COLORS.primary,
  }),
  stickyContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
});

export default styles;