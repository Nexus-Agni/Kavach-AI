import contextlib
import io
import unittest
from main import main


class TestMain(unittest.TestCase):
    def test_main_execution(self):
        buffer = io.StringIO()
        with contextlib.redirect_stdout(buffer):
            main()
        self.assertIn("Kavach Analysis Engine initialized.", buffer.getvalue())


if __name__ == "__main__":
    unittest.main()
