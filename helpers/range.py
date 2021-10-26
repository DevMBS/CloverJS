import rospy
from sensor_msgs.msg import Range
rospy.init_node('flight')
data = rospy.wait_for_message('rangefinder/range', Range)
f = open('rdata.txt', 'w')
f.write(str(data.range))
f.close()